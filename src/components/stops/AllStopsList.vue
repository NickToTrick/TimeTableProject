<template>
  <div class="w-100 h-100 overflow-auto border-radius-block">
    <div class="list-header p-2">
      <div>
        <div class="form-control-holder">
          <input
              type="text"
              class="form-control"
              placeholder="Search..."
              @focus="isInputFocused = true"
              @blur="isInputFocused = false"
              v-model="searchQuery"/>
          <search-icon
              :fill-color="isInputFocused ? 'var(--bs-primary)' : '#9A9DA4'"
              class="search-icon"/>
        </div>
      </div>
      <span class="cursor-pointer d-inline-block sort-title" @click="toggleSortDirection">
        Bus Stops
        <sort-icon/>
      </span>
    </div>
    <ul class="list-group">
      <li
          class="list-group-item"
          v-for="stop in filteredAndSortedStops"
          :key="stop.stop">
        {{ stop.stop }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import {StopData} from '@/types';
import SearchIcon from "@/components/icons/SearchIcon.vue";
import SortIcon from "@/components/icons/SortIcon.vue";

const store = useStore();
const allStops = computed(() => store.getters.allStops as StopData[]);
const searchQuery = ref<string>('');
const sortDirection = ref<'ascending' | 'descending'>('descending');
const isInputFocused = ref(false);

const filteredAndSortedStops = computed(() => {
  return allStops.value
      .filter(stop => stop.stop.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .sort((a, b) => {
        return sortDirection.value === 'ascending'
            ? a.stop.localeCompare(b.stop)
            : b.stop.localeCompare(a.stop);
      });
});

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'ascending' ? 'descending' : 'ascending';
};
</script>

<style scoped lang="scss">
.form-control-holder {
  display: inline-block;
  position: relative;
  margin-bottom: 1.8rem;
}

.form-control {
  width: 288px;
  font-size: .75rem;
  padding: .6rem 1rem;

  &:focus {
    box-shadow: none;
    border-color: var(--bs-primary);
  }
}

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

.sort-title {
  margin: 0 0 1rem 1rem;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 12px;
}
</style>