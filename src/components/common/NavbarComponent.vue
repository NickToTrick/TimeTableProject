<template>
  <nav class="navbar navbar-expand navbar-light bg-light mb-3 border-radius-block bg-white">
    <div class="container-fluid">
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Lines' }"
                to="/lines">Bus Lines
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Stops' }"
                to="/stops">Stops
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';

const $route = useRoute();
</script>

<style scoped lang="scss">
.navbar {
  padding: 0 .8rem;
}
.nav-link {
  font-size: 0.875rem;
  padding: 1.2rem 1.5rem !important;
  font-style: normal;
  font-weight: 500 !important;
  line-height: 1.5rem;
  color: #9A9DA4;
  border-color: var(--bs-primary);
  &.active {
    color: blue;
    font-weight: bold;
    border-bottom: 2px solid var(--bs-primary);
  }
}
</style>