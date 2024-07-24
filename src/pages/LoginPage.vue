<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <Login @on-submit="handleSubmit">
        <UserName name="username" :value="userName" :rules="nameRules" placeholder="Any valid username is fine" />
        <Password name="password" :value="password" :rules="passwordRule" placeholder="Any valid password is fine" />
        <div class="my-3">
          <Checkbox v-model="autoLogin" size="large">Auto Login</Checkbox>
        </div>
        <Submit>Login</Submit>
      </Login>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = (valid: boolean, { username, password }: { username: string; password: string }) => {
  console.log(valid, username, password)
  if (valid) {
    authStore.setMockUser()
    router.push({ name: 'dashboard' })
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
