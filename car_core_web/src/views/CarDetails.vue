<script setup lang="ts">
import { CarRequestService } from '@/services/car/car.request.service';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const car = ref()
const carRequestService = new CarRequestService()

onMounted(async() => {
    try {
        await router.isReady()
        car.value = await carRequestService.getById(route.params.id as string)
        // TODO UI details create delete
    } catch (error) {
        console.log(error);
        
    }
})
</script>
<template>
    <div>
        <pre>
            {{ car }}
        </pre>
    </div>
</template>

<style lang="scss">
    
</style>

