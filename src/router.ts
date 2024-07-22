import { createRouter, createWebHistory, RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import ViewUIPlus from 'view-ui-plus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/SideLayout.vue'),
    redirect: () => ({ name: 'dashboard' }),
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
    ],
  },

  // {
  //   path: "/reports",
  //   component: () => import("./pages/Reports.vue"),
  //   name: "reports",
  // },
  // {
  //   path: "/coingecko",
  //   component: () => import("./pages/Coingecko.vue"),
  //   name: "coingecko",
  // },
  // {
  //   path: `/bot/:id(\\d+)`,
  //   component: () => import("./pages/Bot.vue"),
  //   name: "bot",
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach(async (_: RouteLocationNormalizedGeneric, __: RouteLocationNormalizedGeneric) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.loggedIn

  console.log(authStore, isLoggedIn)

  // if (
  //   !isLoggedIn && // make sure the user is authenticated
  //   to.name !== 'sign-in' // ❗️ Avoid an infinite redirect
  // ) {
  //   return { name: 'sign-in' }; // redirect the user to the sign-in page
  // }
})

router.beforeEach((_: RouteLocationNormalizedGeneric, __: RouteLocationNormalizedGeneric, next) => {
  ViewUIPlus.LoadingBar.start()
  next()
})

router.afterEach(() => {
  ViewUIPlus.LoadingBar.finish()
})

export default router
