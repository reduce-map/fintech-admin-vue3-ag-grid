import { createRouter, createWebHistory, RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'
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
      {
        path: 'reports',
        name: 'reports',
        component: () => import('./pages/ReportsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((_: RouteLocationNormalizedGeneric, __: RouteLocationNormalizedGeneric, next) => {
  ViewUIPlus.LoadingBar.start()
  next()
})

router.afterEach(() => {
  ViewUIPlus.LoadingBar.finish()
})

export default router
