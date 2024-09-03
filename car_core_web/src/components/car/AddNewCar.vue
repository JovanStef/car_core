<script setup lang="ts">
import Dialog from "primevue/dialog";
import DatePicker from "primevue/datepicker";
import { reactive } from "vue";
import FileUpload from "primevue/fileupload";

// TODO all fields
// TODO validation
// TODO submit
// TODO image upload

const show = defineModel<boolean>("show");
const { make, model, photo, mileage, year, winNumber, plateNumbers , photoUrl } =
  defineProps({
    make: String,
    model: String,
    photo: File,
    mileage: Number,
    year: String,
    winNumber: String,
    plateNumbers: String,
    photoUrl:String
  });

const car = reactive({
  make,
  model,
  photo,
  mileage,
  year,
  winNumber,
  plateNumbers,
  photoUrl
});
const emit = defineEmits(['submit'])

const onFileSelect = (evt)=>{
car.photo = evt.files[0]
}

const onSave =() =>{
    show.value = false
    emit('submit' , car)
}


</script>

<template>
  <Dialog
    v-model:visible="show"
    modal
    header="Add New Car"
    :style="{ width: '90%', maxWidth: '768px' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="make" class="font-semibold w-24">Make</label>
      <InputText id="make" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="model" class="font-semibold w-24">Model</label>
      <InputText
        id="model"
        class="flex-auto"
        autocomplete="off"
        v-model="car.model"
      />
    </div>
    <!-- todo file -->
    <div class="flex items-center gap-4 mb-8">
      <label for="photo" class="font-semibold w-24">Photo</label>
      <div>{{ car?.photo?.name }}</div>
      <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined"/>
      <img v-if="car?.photo?.objectURL || photoUrl" :src="car?.photo?.objectURL || photoUrl" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="filter: grayscale(100%)" />    
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="year" class="font-semibold w-24">Year</label>
      <DatePicker id="year" class="flex-auto" v-model="car.year" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="win-number" class="font-semibold w-24">WIN number</label>
      <InputText
        id="win-number"
        class="flex-auto"
        autocomplete="off"
        v-model="car.winNumber"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="plate-number" class="font-semibold w-24">Plate number</label>
      <InputText
        id="plate-number"
        class="flex-auto"
        autocomplete="off"
        v-model="car.plateNumbers"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="show = false"
      ></Button>
      <Button type="button" label="Save" @click="onSave()"></Button>
    </div>
  </Dialog>
</template>
