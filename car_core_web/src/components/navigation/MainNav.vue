<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="wrapper">
      <nav v-if="!$route.meta.hideNavbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <Button>PRIME</Button>
      </nav>
    </div>
</template>