<template>
  <div class="overflow-hidden">
    <AllStopsList v-if="allStops.length"/>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import AllStopsList from "@/components/stops/AllStopsList.vue";

const store = useStore();

const allStops = computed(() => store.getters.allStops)
</script>