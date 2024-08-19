<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserRequstService from '@/services/user/user.request.service';

// TODO loading page
// TODO loading data
// TODO cars list
// TODO car details

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
