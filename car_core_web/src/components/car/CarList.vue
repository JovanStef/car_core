<script setup lang="ts">
import router from "@/router";
import { CarDetailsRouteEnum } from "@/models/routes/routes.enum";
const baseUrl = import.meta.env.VITE_BASE_URL;
const { cars } = defineProps(["cars"]);
const emit = defineEmits(["car-delete"]);
</script>

<template>
  <div class="grid gap-4 list-container">
    <template v-for="car in cars">
      <div class="grid gap-3 car-wrapper-item">
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
        <div class="icon-wrapper flex flex-col items-center justify-around">
          <Button
            icon="pi pi-info-circle"
            @click="router.push(`${CarDetailsRouteEnum.Path}/${car.id}`)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            @click="emit('car-delete', car)"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss">
.list-container {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
.car-wrapper-item {
  grid-template-columns: 50% 1fr 40px;
  border: 1px solid;
  border-radius: 12px;
  max-height: 100px;
  overflow: hidden;
}
.image-wrapper {
  height: 100%;
  overflow: hidden;
}
.image-wrapper > img {
  border-radius: 6px 0 0 6px;
}
.icon-wrapper {
  border-left: 1px solid;
}

.icon-wrapper > button {
  font-size: 20px;
  height: 100%;
}
</style>
