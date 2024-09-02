<script setup lang="ts">
import Dialog from 'primevue/dialog';
// TODO all fields
// TODO validation
// TODO submit
// TODO image upload

const show = defineModel<boolean>('show')

</script>

<template>
    <Dialog v-model:visible="show" modal header="Add New Car" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="show = false"></Button>
        <Button type="button" label="Save" @click="show = false"></Button>
    </div>
</Dialog>
</template>