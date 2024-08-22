<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserRequstService from '@/services/user/user.request.service';
import { CarRequestService } from '@/services/car/car.request.service';
import { FillPageSpinnerUiService } from '@/services/ui/FillPageSpinner.ui.service';

// TODO loading page
// TODO loading data
// TODO cars list
// TODO car details
// TODO error toast

const cars = ref([] as any)
const carRequestService = new CarRequestService()

onMounted(async()=>{
  FillPageSpinnerUiService.setIsLoading(true) 
  try {
    cars.value = await carRequestService.getAll()
    FillPageSpinnerUiService.setIsLoading(false) 

  } catch (error) {
    FillPageSpinnerUiService.setIsLoading(false)
    console.log(error);
    
  }
})
</script>

<template>
    <pre>
      {{ cars }}
    </pre>
    
</template>
