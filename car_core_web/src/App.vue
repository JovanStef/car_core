<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNav from './components/navigation/MainNav.vue';
</script>

<template>
  <header class="self-start pt-3">
<MainNav/>
    
  </header>

  <RouterView />
</template>


