<template>
  <div class="lines-list">
    <h6>Select Bus Line</h6>
    <ul class="d-flex flex-wrap">
      <li
          v-for="(line, index) in lines"
          :key="`line-${index}`"
          :class="{'selected' : line === currentLine}"
          @click="handleLineClick(line)">
        <span class="badge text-bg-primary">{{ line }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const lines = computed(() => store.getters.lines);
const currentLine = computed(() => store.getters.currentLine);

const handleLineClick = (line: number) => {
  store.dispatch('selectLine', line);
  store.dispatch('selectStop', []);
};
</script>

<style scoped lang="scss">
.lines-list {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    gap: .5rem;

    li {
      display: inline-block;

      &.selected {
        .badge {
          background-color: #2E3E6E !important;
        }
      }
    }
  }
}
h6 {
  margin-bottom: 2rem;
}
</style>