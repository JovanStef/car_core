<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import UserRequstService from '@/services/user/user.request.service';

const user = ref({})
const userRequstService = new UserRequstService()
onMounted(async()=>{
  try {
    user.value = await userRequstService.getUser()
    
  } catch (error) {
    console.log(error);
    
  }
})
</script>

<template>
  <main>
    <pre>
      {{ user }}
    </pre>
    <TheWelcome />
  </main>
</template>
