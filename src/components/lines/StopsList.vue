<template>
  <div class="w-100 h-100 overflow-auto">
    <div class="list-header p-4">
      <h6>Bus Line: {{ currentLine }}</h6>
      <span class="cursor-pointer d-inline-block sort-title" @click="toggleSortDirection">
        Bus Stops
        <sort-icon/>
      </span>
    </div>
    <div class="stops-list" v-if="sortedStops.length">
      <ul class="list-group">
        <li
            class="list-group-item cursor-pointer"
            v-for="(stop, index) in sortedStops"
            :key="`stop-${index}`"
            :class="{'selected' : stop.stop === currentStopName}"
            @click="handleStopClick(stop)">
          {{ stop.stop }} {{ stop.order }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useStore} from 'vuex';
import { StopData } from '@/types';
import SortIcon from "@/components/icons/SortIcon.vue";

const store = useStore();
const sortDirection = ref<'ascending' | 'descending'>('ascending');
const currentLine = computed(() => store.getters.currentLine);
let currentStopName = ref<string>('');

const handleStopClick = (stop: StopData) => {
  store.dispatch('selectStop', stop.stop);
  store.commit('setCurrentStopName', `${stop.stop} ${stop.order}`);
  currentStopName.value = stop.stop
};

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending';
};

const sortedStops = computed(() => {
  const stopsArray: StopData[] = [...store.getters.selectedLineStops as StopData[]];
  if (sortDirection.value === 'ascending') {
    return stopsArray.sort((a, b) => a.order - b.order);
  } else {
    return stopsArray.sort((a, b) => b.order - a.order);
  }
});

watch(currentLine, () => {
  currentStopName.value = '';
  sortDirection.value = 'ascending'
})
</script>

<style scoped lang="scss">
.list-group-item {
  transition: background-color .3s;
  border-left: 0;
  border-right: 0;
  border-color: #F3F4F9;
  padding: 1rem 1.5rem;

  &:first-of-type {
    border-top: none;
    border-radius: 0;
  }

  &:hover {
    background-color: #F8F8FB;
  }

  &.selected {
    background-color: white;
    color: var(--bs-primary);
  }
}

.list-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid #E2E4EA;
}

h6 {
  margin-bottom: 1.7rem;
}
</style>