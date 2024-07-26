import { createRouter, createWebHistory, RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'
import ViewUIPlus from 'view-ui-plus'
import { useAuthStore } from '@/store/auth.ts'
import { setBodyClass } from '@/utils'

const routes: RouteRecordRaw[] = [
  // private routes
  {
    path: '/',
    component: () => import('@/layouts/SideLayout.vue'),
    redirect: () => ({ name: 'dashboard' }),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/DashboardPage.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('./pages/SettingsPage.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('./pages/ReportsPage.vue'),
      },
      {
        path: `/bot/:id(\\d+)`,
        name: 'bot',
        component: () => import('./pages/BotPage.vue'),
      },
      {
        path: `/coin-gecko`,
        name: 'coin-gecko',
        component: () => import('./pages/CoinGeckoPage.vue'),
      },
    ],
  },
  // public routes
  {
    path: '/login',
    name: 'login',
    beforeEnter: (_, from, next) => {
      const authStore = useAuthStore()
      if (!authStore.loggedIn) {
        next()
      } else {
        next({ path: from.fullPath, replace: true })
      }
    },
    component: () => import('@/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to: RouteLocationNormalizedGeneric, __: RouteLocationNormalizedGeneric, next) => {
  const authStore = useAuthStore()

  ViewUIPlus.LoadingBar.start()

  if (to.meta.requiresAuth) {
    // see more https://router.vuejs.org/guide/advanced/meta.html
    // see more https://router.vuejs.org/guide/advanced/navigation-guards.html

    if (!authStore.loggedIn) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }

  next()
})

router.afterEach((to: RouteLocationNormalizedGeneric) => {
  setBodyClass(to)
  ViewUIPlus.LoadingBar.finish()
})

export default router
