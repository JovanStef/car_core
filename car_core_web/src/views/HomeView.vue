<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CarRequestService } from "@/services/car/car.request.service";
import { FullPageSpinnerUiService } from "@/services/ui/fullPageSpinner.ui.service";
import AddNewCar from "@/components/car/AddNewCar.vue";
import CarList from "@/components/car/CarList.vue";
import type { TCarAll } from "@/models/car/car.dto.type";
import ConfirmCarDelete from "@/components/car/ConfirmCarDelete.vue";
import { AlertsUiService } from "@/services/ui/alerts.ui.service";

const cars = ref<TCarAll[]>([]);
const carRequestService = new CarRequestService();
const show = ref(false);
const carToDelete = ref<TCarAll>();
const showDeleteDialog = ref(false)


onMounted(async () => {
  FullPageSpinnerUiService.setIsLoading(true);
  try {
    cars.value = await carRequestService.getAll();
    FullPageSpinnerUiService.setIsLoading(false);
  } catch (error) {
    FullPageSpinnerUiService.setIsLoading(false);
    console.log(error);
  }
});

const onCarSave = async (payload: any) => {
  FullPageSpinnerUiService.setIsLoading(true);
  try {
    await carRequestService.upsert(payload);
    AlertsUiService.addToast({ severity: 'success', summary: 'Success', detail: 'Car create success', life: 3000 }).showToast()

    show.value = false;
    cars.value = await carRequestService.getAll();
    FullPageSpinnerUiService.setIsLoading(false);
  } catch (error: any) {
    FullPageSpinnerUiService.setIsLoading(false);
    console.log(error);
  }
};
const onCarDelete = async (car: TCarAll) => {
  showDeleteDialog.value = true
  carToDelete.value = car
};

const deleteCar= async (id: number) => {
  FullPageSpinnerUiService.setIsLoading(true);
  try {
    await carRequestService.delete(id);
  showDeleteDialog.value = false

    FullPageSpinnerUiService.setIsLoading(false);
    cars.value = await carRequestService.getAll();
    AlertsUiService.addToast({ severity: 'success', summary: 'Success', detail: 'Car deleted success', life: 3000 }).showToast()
  } catch (error: any) {
    FullPageSpinnerUiService.setIsLoading(false);
    console.log(error);
  }
};
</script>

<template>
  <AddNewCar v-model:show="show" @submit="onCarSave" />
<ConfirmCarDelete v-model:show="showDeleteDialog" :car="carToDelete" @confirm="deleteCar"/>
  <div
    class="grid gap-4 actions-container border rounded-xl overflow-hidden mb-4"
  >
    <Button class="ml-auto" icon="pi pi-plus-circle" @click="show = true" />
    <!-- TODO sort / filter -->
  </div>
<CarList :cars="cars" @car-delete="onCarDelete" />
</template>


