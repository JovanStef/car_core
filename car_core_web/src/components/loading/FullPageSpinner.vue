<script setup lang="ts">
import { FillPageSpinnerUiService } from '@/services/ui/FillPageSpinner.ui.service';
import { ref } from '@vue/runtime-dom';
import { useSubscription } from '@vueuse/rxjs';
import ProgressSpinner from 'primevue/progressspinner';

const showSpinner = ref(false)

const $isLoading = FillPageSpinnerUiService.isLoading

useSubscription($isLoading.subscribe((value)=>{
    showSpinner.value = value
}))

</script>

<template>
    <main v-if="showSpinner" class="spinner h-full w-full absolute flex justify-center items-center top-0 left-0">
        <ProgressSpinner strokeWidth="3" />
    </main>
</template>

<style lang="css">
@keyframes fadeInFromNone {
    0% {
        opacity: 0.5;
    }
    50%{
        opacity: 0.8;
    }

    100% {
        opacity: 0.5;
    }
}
.spinner{
background: var(--color-background);
  z-index: 100;
  animation: fadeInFromNone 1.5s ease-out;
  animation-iteration-count:infinite;
}

</style>