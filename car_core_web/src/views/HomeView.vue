<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CarRequestService } from '@/services/car/car.request.service';
import { FullPageSpinnerUiService } from '@/services/ui/fullPageSpinner.ui.service';
import router from '@/router';
import { CarDetailsRouteEnum } from '@/models/routes/routes.enum';
import AddNewCar from '@/components/car/AddNewCar.vue';
import type { TCarAll } from '@/models/car/car.dto.type';

const cars = ref<TCarAll[]>([])
const carRequestService = new CarRequestService()
const baseUrl = import.meta.env.VITE_BASE_URL

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
const show = ref(false)


const onCarSave = async(payload:any) =>{
  FullPageSpinnerUiService.setIsLoading(true) 
  try {
    await carRequestService.upsert(payload)
    cars.value = await carRequestService.getAll()
    FullPageSpinnerUiService.setIsLoading(false) 
    show.value = false
  } catch (error:any) {
    FullPageSpinnerUiService.setIsLoading(false)
    console.log(error);
    
  }
}
const onCarDelete = async(id:number)=>{
  // TODO confirm delete dialog
  FullPageSpinnerUiService.setIsLoading(true) 
  try {
    await carRequestService.delete(id)
    cars.value = await carRequestService.getAll()
    FullPageSpinnerUiService.setIsLoading(false) 
    show.value = false
  } catch (error:any) {
    FullPageSpinnerUiService.setIsLoading(false)
    console.log(error);
    
  }

}

</script>

<template>
   <AddNewCar v-model:show="show" @submit="onCarSave"/>


<div class="grid gap-4 actions-container border rounded-xl overflow-hidden mb-4">
  <Button class="ml-auto" icon="pi pi-plus-circle" @click="show=true"/>
<!-- TODO sort / filter -->
</div>
  <div class="grid gap-4 list-container">
  <template v-for="car in cars">
    <div class="grid gap-3 car-wrapper-item" >
      <div class="image-wrapper ">
        <img class="w-full h-full object-cover" :src="baseUrl + car.photo" alt="">
      </div> 
      <div class="info-wrapper">
        <ul>
          <li><small>Make: </small><span>{{ car.make }}</span></li>
          <li><small>Model: </small><span>{{ car.model }}</span></li>
        </ul>
      </div>
      <div class="icon-wrapper flex flex-col items-center justify-around">
      <Button icon="pi pi-info-circle" @click="router.push(`${CarDetailsRouteEnum.Path}/${car.id}`)" />
<Button icon="pi pi-trash" severity="danger" @click="onCarDelete(car.id)"/>

      </div>
    </div>
  </template>
</div>
    
</template>

<style lang="css">
  .car-wrapper-item{
    grid-template-columns: 25% 1fr 40px;
    border: 1px solid;
  border-radius: 12px;
  max-height: 100px;
  overflow: hidden;
  }
  .image-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .image-wrapper>img{
    border-radius: 6px 0 0 6px;
  }
  .icon-wrapper{
    border-left: 1px solid;
}

  .icon-wrapper>button{
    font-size: 20px;
    height: 100%;
  }
</style>
