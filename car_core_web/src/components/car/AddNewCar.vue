<script setup lang="ts">
import Dialog from "primevue/dialog";
import DatePicker from "primevue/datepicker";
import { reactive, ref, toRaw } from "vue";
import FileUpload from "primevue/fileupload";
import { CarDto } from "@/models/car/car.dto";
import Message from 'primevue/message';

// TODO all fields
// TODO validation
// TODO submit
// TODO image upload

const show = defineModel<boolean>("show");
const { make, model, photo, mileage, year, winNumber, plateNumbers } =
  defineProps({
    make: String,
    model: String,
    photo: File,
    mileage: Number,
    year: String,
    winNumber: String,
    plateNumbers: String,
  });

const carInitial = {
  make,
  model,
  photo,
  mileage,
  year,
  winNumber,
  plateNumbers,
  
}

const car = reactive({...carInitial});

const errors= ref({})

const emit = defineEmits(['submit'])

const onFileSelect = async(evt:any)=>{
  
  car.photo = evt.files[0]
 
}

const onSave =() =>{
  try {
    const carDto = CarDto.upsertReqDto(toRaw(car)as any)
    emit('submit' , carDto)
  } catch (error:any) {
    console.log(error);
    
    errors.value = error
    
  }
}

const onCancel = () => {
  Object.assign(car, carInitial);
  show.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="show"
    modal
    header="Add New Car"
    :style="{ width: '90%', maxWidth: '768px' }"
    @hide="onCancel()"
  >
    <div class="field mb-8">
        <label for="make" class="font-semibold w-24">Make</label>
        <InputText id="make" class="input input flex-auto" autocomplete="off" v-model="car.make"/>
        <Message v-if="errors.make" severity="error" class="error mt-3">{{ errors.make }}</Message>
    </div>
    <div class="field mb-8">
      <label for="model" class="font-semibold w-24">Model</label>
      <InputText
        id="model"
        class="input flex-auto"
        autocomplete="off"
        v-model="car.model"
      />
      <Message v-if="errors.model" severity="error" class="error mt-3">{{ errors.model }}</Message>

    </div>
    <div class="field mb-4 mb-8">
      <label for="photo" class="font-semibold w-24">Photo</label>
      <div class="input photo-field gap-4">
        <div class="flex flex-col gap-4">
          <div class="file-name">{{ car?.photo?.name }}</div>
          
          <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="upload p-button-outlined"/>
        </div>
        <img v-if="car?.photo?.objectURL" :src="car?.photo?.objectURL" alt="Image" class="preview shadow-md rounded-xl w-full h-64 object-contain" />    
      </div>
      <Message v-if="errors.photo" severity="error" class="error mt-3">{{ errors.photo }}</Message>
    </div>
    <div class="field mb-4 mb-8">
      <label for="mileage" class="font-semibold w-24">Mileage</label>
      <InputText id="mileage" class="input input flex-auto" autocomplete="off" v-model="car.mileage"/>
      <Message v-if="errors.mileage" severity="error" class="error mt-3">{{ errors.mileage }}</Message>

    </div>
    <div class="field mb-4 mb-8">
      <label for="year" class="font-semibold w-24">Year</label>
      <DatePicker id="year" class="input flex-auto" v-model="car.year" />
      <Message v-if="errors.year" severity="error" class="error mt-3">{{ errors.year }}</Message>

    </div>
    <div class="field mb-4 mb-8">
      <label for="win-number" class="font-semibold w-24">WIN number</label>
      <InputText
        id="win-number"
        class="input flex-auto"
        autocomplete="off"
        v-model="car.winNumber"
      />
      <Message v-if="errors.winNumber" severity="error" class="error mt-3">{{ errors.winNumber }}</Message>

    </div>
    <div class="field mb-4 mb-8">
      <label for="plate-number" class="font-semibold w-24">Plate number</label>
      <InputText
        id="plate-number"
        class="input flex-auto"
        autocomplete="off"
        v-model="car.plateNumbers"
      />
      <Message v-if="errors.plateNumbers" severity="error" class="error mt-3">{{ errors.plateNumbers }}</Message>

    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="onCancel()"
      ></Button>
      <Button type="button" label="Save" @click="onSave()"></Button>
    </div>
  </Dialog>
</template>

<style lang="scss">
.field{
  display: grid;
  grid-template-columns: 115px 1fr;
  grid-template-areas:'label field'
                      'none message' ;
  label{
    grid-area: label;

  }
  .input{
    grid-area: field;
  }
  .error{
    grid-area: message;
  }
}

.photo-field{
  display: grid;
  grid-template-columns: 115px 1fr;

}
</style>
