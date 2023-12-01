<template>
  <div class="d-flex flex-column vh-100 app-container">
    <h4 class="mt-3">Timetable</h4>
    <NavbarComponent/>
    <router-view class="d-flex flex-column flex-grow-1 overflow-hidden"></router-view>
  </div>
</template>

<script setup lang="ts">
import {useStore} from 'vuex';
import NavbarComponent from "@/components/common/NavbarComponent.vue";

const store = useStore();

store.dispatch('fetchStops');

</script>

<style scoped lang="scss">
.app-container {
  min-height: 600px;
  padding: 2rem;
}
.container-fluid {
  padding: 1rem;
}

h4 {
  margin-bottom: 2rem;
}

</style>