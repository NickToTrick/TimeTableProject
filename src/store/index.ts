import {createStore} from 'vuex';
import {fetchStops} from '@/services/apiService';
import {StopData} from "@/types";

interface State {
  allStops: StopData[];
  selectedLineStops: StopData[];
  selectedStopTimes: string[];
  currentLine: number;
  currentStopName: string;
}

export default createStore<State>({
  state: {
    allStops: [],
    selectedLineStops: [],
    selectedStopTimes: [],
    currentLine: 0,
    currentStopName: '',
  },

  getters: {
    lines: (state): number[] => {
      return [...new Set(state.allStops.map(stop => stop.line))]
        .sort((a, b) => a - b);
    },

    selectedLineStops: (state): StopData[] => {
      const uniqueStops = [...new Map(state.selectedLineStops.map(item => [item.stop, item])).values()];
      return uniqueStops.sort((a, b) => a.order - b.order);
    },

    selectedStopTimes: (state): string[] => {
      return [...new Set(state.selectedStopTimes)]
        .filter(time => typeof time === 'string' && time.includes(':'))
        .sort((a, b) => {
          const timeToMinutes = (time: string) => {
            const parts = time.split(':');
            if (parts.length === 2) {
              const hours = parseInt(parts[0], 10);
              const minutes = parseInt(parts[1], 10);
              return (hours * 60) + minutes;
            }
            return 0;
          };

          return timeToMinutes(a) - timeToMinutes(b);
        });
    },

    allStops: (state): StopData[] => {
      const uniqueStops = new Map(state.allStops.map(stop => [stop.stop, stop]));
      return Array.from(uniqueStops.values()).sort((a, b) => a.stop.localeCompare(b.stop));
    },

    currentLine: (state): number => state.currentLine,
    currentStopName: (state): string => state.currentStopName
  },

  mutations: {
    setAllStops(state, stops: StopData[]) {
      state.allStops = stops;
    },
    setSelectedLineStops(state, line: number) {
      state.selectedLineStops = state.allStops.filter(stop => stop.line === line);
    },
    setSelectedStopTimes(state, stopName: string) {
      state.selectedStopTimes = state.allStops.filter(stop => stop.stop === stopName).map(stop => stop.time);
    },
    setCurrentLine(state, line: number) {
      state.currentLine = line
    },
    setCurrentStopName(state, stopName: string) {
      state.currentStopName = stopName
    },
    RESET_STATE(state) {
      state.selectedLineStops = [];
      state.selectedStopTimes = [];
      state.currentLine = 0;
      state.currentStopName = "";
    }
  },

  actions: {
    async fetchStops({commit}) {
      try {
        const stopsData = await fetchStops();
        commit('setAllStops', stopsData);
      } catch (error) {
        console.error('Error while fetching stops:', error);
      }
    },
    selectLine({commit}, line: number) {
      commit('setSelectedLineStops', line);
      commit('setCurrentLine', line)
    },
    selectStop({commit}, stopName: string) {
      commit('setSelectedStopTimes', stopName);
    }
  }
});