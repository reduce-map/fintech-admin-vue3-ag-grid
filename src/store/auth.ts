import { defineStore } from 'pinia'

import AuthService from '@/services/auth-service.ts'

export interface User {
  token: string
  role: string
  username: string
}

export interface AuthState {
  currentUser: User | null
  authError: string | null
  wasLoggedIn: boolean
}

const getMockUser = (username: string = 'reduce-map', password: string = 'hello-world') => {
  return {
    token: `your-${password}-token`,
    role: 'admin',
    username: username,
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    currentUser: JSON.parse(localStorage.getItem('auth.currentUser') as string) || null,
    authError: null,
    wasLoggedIn: false,
  }),
  getters: {
    loggedIn: (state): boolean => !!state.currentUser?.token,
    role: (state): string | undefined => state.currentUser?.role,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const user = await AuthService.login(email, password)
        this.setCurrentUser(user)
      } catch (error) {
        this.authError = 'Invalid email or password'
      }
    },
    setCurrentUser(user: User) {
      this.currentUser = user
      localStorage.setItem('auth.currentUser', JSON.stringify(user))
    },
    logOut() {
      this.currentUser = null
      localStorage.removeItem('auth.currentUser')
    },
    setMockUser() {
      const mockUser = getMockUser()
      this.currentUser = mockUser
      localStorage.setItem('auth.currentUser', JSON.stringify(mockUser))
    },
  },
})
