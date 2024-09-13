<script setup lang="ts">
import Dialog from "primevue/dialog";
const baseUrl = import.meta.env.VITE_BASE_URL;

const show = defineModel<boolean>("show");
const { car } = defineProps(["car"]);
const emit = defineEmits(["confirm"]);
const onCancel = () => {
  show.value = false;
};
</script>
<template>
  <Dialog
    v-model:visible="show"
    modal
    header="Confirm Delete"
    :style="{ width: '90%', maxWidth: '768px' }"
    @hide="onCancel()"
  >
  <div class="flex gap-4 flex-col">
      <p>You are about to delete:</p>
      <div class="flex gap-4 items-center justify-around ">

<i class="pi pi-exclamation-triangle warning-icon" style="color: red"></i>
    
      <div class="grid gap-3 self-center car-wrapper-item">
        <div class="image-wrapper">
          <img
            class="w-full h-full object-cover"
            :src="baseUrl + car.photo"
            alt=""
          />
        </div>
        <div class="info-wrapper">
          <ul>
            <li>
              <small>Make: </small><span>{{ car.make }}</span>
            </li>
            <li>
              <small>Model: </small><span>{{ car.model }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-around gap-3">
        <Button class="dialog-btn" icon="pi pi-plus-circle" severity="success" @click="emit('confirm', car.id)" >Confirm</Button>
        <Button class="dialog-btn" icon="pi pi-plus-circle" severity="danger" @click="show = false">Cancel</Button>
    </div>
  </div>

  </Dialog>
</template>

<style scoped lang="scss">
.dialog-btn{
    width: clamp(30px , 100% , 300px) !important;
}

.car-wrapper-item {
  grid-template-columns: 50% 1fr 40px;
  border: 1px solid;
  border-radius: 12px;
  max-height: 135px;
  overflow: hidden;
  width: clamp(100px ,100%,400px);
}
.image-wrapper {
  height: 100%;
  overflow: hidden;
}
.image-wrapper > img {
  border-radius: 6px 0 0 6px;
}
.warning-icon{
    color: red;
    font-size: clamp(12px,60px,70px) !important;  
    height: fit-content;
}
</style>
