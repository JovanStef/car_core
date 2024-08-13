<script setup lang="ts">
import { AuthDto } from '@/DTO/auth/auth.dto';
import { HomeRouteEnum, LoginRouteEnum } from '@/models/routes/routes.enum';
import router from '@/router';
import AuthenticationRequestService from '@/services/auth/authentication.request.service';
import { ref } from 'vue';
const authenticationRequestService = new AuthenticationRequestService()
const email = ref('')
const password = ref('')

const onLogin = async ()=> {
  const payload = AuthDto.loginReq(email.value , password.value)
  try{
    await authenticationRequestService.login({... payload})
    router.push(HomeRouteEnum.Path)
  }catch(error){
console.log(error);
// TODO validation
  }

}
</script>

<template>
  <main>
    <Card>
      <template #title>Login</template>
      <template #content>
        <div class="pt-6">

          <FloatLabel >
            <InputText id="email"  v-model="email"/>
            <label for="email">Email</label>
          </FloatLabel>
        </div>
        <div class="pt-6">

          <FloatLabel >
            <Password  inputId="password" v-model="password"/>
            <label for="password">Password</label>
          </FloatLabel>
        </div>
        <div class="pt-6 flex">
            <Button class="ml-auto" @click="onLogin">Login</Button>
        </div>
      </template>
    </Card>
  </main>
</template>
