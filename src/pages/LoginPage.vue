<template>
  <div class="min-h-screen flex items-center justify-center login-wrapper">
    <SplineExample class="fixed left-0 top-0" />
    <Card class="min-w-80">
      <Login @on-submit="handleSubmit">
        <UserName name="username" :value="userName" :rules="nameRules" placeholder="Any valid username is fine" />
        <Password name="password" :value="password" :rules="passwordRule" placeholder="Any valid password is fine" />
        <div class="my-3">
          <Checkbox v-model="autoLogin" size="large">Auto Login</Checkbox>
        </div>
        <Submit>Login</Submit>
      </Login>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.ts'
import { useRouter } from 'vue-router'
// @ts-expect-error SPLINE EXAMPLE no types
import SplineExample from '@/components/SplineExample.vue'
import {Message} from "view-ui-plus";

const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = (valid: boolean, { username, password }: { username: string; password: string }) => {
  console.log(valid, username, password)
  if (valid) {
    authStore.setMockUser()
    router.push({ name: 'dashboard' })
  } else {
    Message.error(`Form validity is : ${valid}, username: ${username}, password: ${password}`)
  }
}

const autoLogin = ref(true)
const userName = ref('reduce-map')
const password = ref('hello-world')

const passwordRule = [
  { required: true, message: 'Please enter the password', trigger: 'blur' },
  { min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'change' },
]

const nameRules = [
  { required: true, message: 'Please enter the username', trigger: 'blur' },
  { min: 3, message: 'The username length cannot be less than 3 bits', trigger: 'change' },
]
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%);
}
</style>
