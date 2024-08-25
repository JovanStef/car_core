<script setup lang="ts">
import { AlertsUiService } from '@/services/ui/alerts.ui.service';
import { useSubscription } from '@vueuse/rxjs';
import Toast from 'primevue/toast';

import { useToast } from "primevue/usetoast";
import { onMounted } from 'vue';
const toast = useToast();
const toast$ = AlertsUiService.toast

useSubscription(toast$.subscribe((value)=>{
    toast.add(value);

}))

</script>
<template>
    <Toast />
</template>