<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CarRequestService } from '@/services/car/car.request.service';
import { FullPageSpinnerUiService } from '@/services/ui/fullPageSpinner.ui.service';
import router from '@/router';
import { CarDetailsRouteEnum } from '@/models/routes/routes.enum';

// TODO cars list
// TODO car details
// TODO car DTO
const cars = ref([] as any)
const carRequestService = new CarRequestService()

onMounted(async()=>{
  FullPageSpinnerUiService.setIsLoading(true) 
  try {
    cars.value = await carRequestService.getAll()
    FullPageSpinnerUiService.setIsLoading(false) 

  } catch (error) {
    FullPageSpinnerUiService.setIsLoading(false)
    console.log(error);
    
  }
})
</script>

<template>
  <template v-for="car in cars">
    <div @click="router.push(`${CarDetailsRouteEnum.Path}/${car.id}`)">
      <pre>
        {{ car }}
      </pre>
    </div>
  </template>
    
</template>
