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
  <div class="grid gap-4 list-container">
  <template v-for="car in cars">
    <div class="grid gap-3 car-wrapper-item" >
      <div class="image-wrapper ">
        <img class="w-full h-full object-cover" src="https://wiki.tripwireinteractive.com/TWIimages/4/47/Placeholder.png" alt="">
      </div> 
      <div class="info-wrapper">
        <ul>
          <li>{{ car.make }}</li>
          <li>{{ car.model }}</li>
        </ul>
      </div>
      <div class="icon-wrapper flex flex-col items-center justify-around">
        <i class="pi pi-info-circle" @click="router.push(`${CarDetailsRouteEnum.Path}/${car.id}`)"></i>
        <i class="pi pi-trash"></i>
      </div>
    </div>
  </template>
</div>
    
</template>

<style lang="css">
  .car-wrapper-item{
    grid-template-columns: 25% 1fr 40px;
    border: 1px solid;
  padding: 5px;
  border-radius: 12px;
  }
  .image-wrapper{
    max-height: 75px;
  }
  .image-wrapper>img{
    border-radius: 6px 0 0 6px;
  }
  .icon-wrapper{
    border-left: 1px solid;
    padding: 5px;
}

  .icon-wrapper>i{
    font-size: 20px;
    padding: 2px;
  }
</style>
