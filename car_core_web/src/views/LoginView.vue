<script setup lang="ts">
import { AuthLoginDto } from '@/DTO/auth/auth.dto';
import AuthenticationService from '@/services/auth/authentication.service';
import { ref } from 'vue';
const authenticationService = new AuthenticationService()
const email = ref('')
const password = ref('')

const onLogin = async ()=> {
  const payload = new AuthLoginDto(email.value , password.value)
  try{
    const res = await authenticationService.post({... payload})
    console.log(res);
  }catch(error){
console.log(error);

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
