<script setup lang="ts">
import { AuthDto } from '@/models/auth/auth.dto';
import { HomeRouteEnum, LoginRouteEnum } from '@/models/routes/routes.enum';
import router from '@/router';
import AuthenticationRequestService from '@/services/auth/authentication.request.service';
import { computed, ref } from 'vue';
import IndeterminateProggressBar from '@/components/loading/IndeterminateProggressBar.vue';
import Message from 'primevue/message';
import { log } from 'console';
const authenticationRequestService = new AuthenticationRequestService()
const email = ref('')
const emailError = ref('')
const password = ref('')
const passwordError = ref('')
const isDisabled = ref(false)
const showLoader = ref(false)

const onLogin = async ()=> {
  try{
    const payload = AuthDto.loginReq(email.value , password.value)
    isDisabled.value = true
    showLoader.value = true
    await authenticationRequestService.login({... payload})
    router.push(HomeRouteEnum.Path)
  }catch(error:any){
    showLoader.value = false
    isDisabled.value = false
    emailError.value = error.email
    passwordError.value = error.password
  }

}


</script>

<template>
  <main class="h-full flex flex-col justify-center items-center">
    <Card class="border-solid border-2 relative">
      <template #title>
        <IndeterminateProggressBar v-if="showLoader"/>
        Login</template>
      <template #content>
        <div class="pt-6">

          <FloatLabel >
            <InputText id="email"  v-model="email" :disabled="isDisabled" :invalid="!!emailError"/>
            <label for="email">Email</label>
          </FloatLabel>
        </div>
        <div class="pt-6">

          <FloatLabel >
            <Password  inputId="password" v-model="password" :disabled="isDisabled" :invalid="!!passwordError"/>
            <label for="password">Password</label>
          </FloatLabel>
        </div>
        <div class="pt-6 flex">
            <Button class="ml-auto" @click="onLogin" :disabled="isDisabled">Login</Button>
        </div>
        
      </template>
    </Card>
    <Message v-if="emailError" severity="error" class="mt-3">{{ emailError }}</Message>
    <Message v-if="passwordError" severity="error" class="mt-3">{{  passwordError }}</Message>

  </main>
</template>
