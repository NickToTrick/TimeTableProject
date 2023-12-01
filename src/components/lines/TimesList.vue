<template>
  <div class="w-100 h-100 overflow-auto">
    <div class="list-header p-4">
      <h6 class="m-0">Bus Stop: {{ currentStopName }}</h6>
    </div>
    <div class="times-list" v-if="times.length">
      <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(time, index) in times"
            :key="`time-${index}`">
          {{ time }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const times = computed(() => store.getters.selectedStopTimes);
const currentStopName = computed(() => store.getters.currentStopName);
</script>

<style scoped lang="scss">
.list-group-item {
  border-left: 0;
  border-right: 0;
  border-color: #F3F4F9;
  padding: 1rem 1.5rem;

  &:first-of-type {
    border-top: none;
    border-radius: 0;
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