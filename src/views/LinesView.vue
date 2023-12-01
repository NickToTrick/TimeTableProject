<template>
  <div class="overflow-hidden">
    <div class="bg-white p-4 mb-3 border-radius-block">
      <LinesList v-if="lines"/>
    </div>
    <div class="flex-grow-1 d-flex gap-3 overflow-hidden">
      <div
          class="w-50 bg-white d-flex justify-content-center align-items-center"
          :class="{'dashed-border' : !selectedLineStops.length}">
        <StopsList v-if="selectedLineStops.length"/>
        <span v-else class="placeholder-text">Please select the bus line first</span>
      </div>
      <div
          class="w-50 bg-white d-flex justify-content-center align-items-center"
          :class="{'dashed-border' : !selectedStopTimes.length}">
        <TimesList v-if="selectedStopTimes.length"/>
        <span v-if="!selectedLineStops.length" class="placeholder-text">Please select the bus line first</span>
        <span v-else-if="!selectedStopTimes.length" class="placeholder-text">Please select the bus stop first</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {onBeforeRouteLeave} from 'vue-router';
import LinesList from "@/components/lines/LinesList.vue";
import StopsList from "@/components/lines/StopsList.vue";
import TimesList from "@/components/lines/TimesList.vue";

const store = useStore();
const lines = computed(() => store.getters.lines);
const selectedLineStops = computed(() => store.getters.selectedLineStops);
const selectedStopTimes = computed(() => store.getters.selectedStopTimes);

onBeforeRouteLeave(() => {
  store.commit('RESET_STATE');
});
</script>

<style scoped lang="scss">
.placeholder-text {
  color: #63666E;
}
</style>