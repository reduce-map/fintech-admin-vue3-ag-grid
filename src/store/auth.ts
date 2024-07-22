import { defineStore } from 'pinia';
import AuthService from '@/services/auth-service.ts';

export interface User {
  token: string;
  role: string;
  email: string;
}

export interface UserInfo {
  companyName: string;
}

export interface AuthState {
  currentUser: User | null;
  userInfo: UserInfo | null;
  authError: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    currentUser: JSON.parse(localStorage.getItem('auth.currentUser') as string) || null,
    userInfo: null,
    authError: null,
  }),
  getters: {
    loggedIn: (state): boolean => !!state.currentUser?.token,
    role: (state): string | undefined => state.currentUser?.role,
    email: (state): string | undefined => state.currentUser?.email,
    companyName: (state): string | undefined => state.userInfo?.companyName,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const user = await AuthService.login(email, password);
        this.setCurrentUser(user);
      } catch (error) {
        this.authError = 'Invalid email or password';
      }
    },
    setCurrentUser(user: User) {
      this.currentUser = user;
      localStorage.setItem('auth.currentUser', JSON.stringify(user));
    },
    async getUserInfo() {
      // const userInfo = await AuthService.getUserInfo();
      // this.userInfo = userInfo;
    },
    async validate() {
      if (!this.loggedIn) return null;

      try {
        // const { data } = await AuthService.validate();
        // this.setCurrentUser(data);
        // return data;
      } catch (error) {
        // this.setCurrentUser(null);
        throw error;
      }
    },
    signOut() {
      this.currentUser = null;
      localStorage.removeItem('auth.currentUser');
    },
  },
});
