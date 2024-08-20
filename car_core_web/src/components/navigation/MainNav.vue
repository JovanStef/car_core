<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar';


import { ref } from "vue";
import router from '@/router';
import { HomeRouteEnum, LoginRouteEnum, ServiceSheetsRouteEnum } from '@/models/routes/routes.enum';
import AuthenticationRequestService from '@/services/auth/authentication.request.service';

const authenticationRequestService = new AuthenticationRequestService()
const onLogout = async()=>{
  try {
    await authenticationRequestService.logout()
    router.push(LoginRouteEnum.Path)
    
  } catch (error) {
    throw error
  }
}
const items = ref([
    {
        label: 'Cars',
        icon: 'pi pi-warehouse',
        command:()=> router.push(HomeRouteEnum.Path)
    },
    {
        label: 'Services',
        icon: 'pi pi-wrench',
        command:()=> router.push(ServiceSheetsRouteEnum.Path)
    },
    {
        label: 'User',
        icon: 'pi pi-user',
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-user-edit'
            },
            {
                label: 'LogOut',
                icon: 'pi pi-sign-out',
                command:onLogout

            },
        ]
    },
]);



</script>

<template>
        <Menubar :model="items" />

</template>