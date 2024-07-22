import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedGeneric,
} from "vue-router";
// import { useAuthStore } from '@/store/auth';
import ViewUIPlus from "view-ui-plus";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/DashboardPage.vue"),
      name: "dashboard",
    },
    // {
    //   path: "/settings",
    //   component: () => import("./pages/Settings.vue"),
    //   name: "settings",
    // },
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
  ],
});

// router.beforeEach(async (to, from) => {
//   const authStore = useAuthStore();
//   const isLoggedIn = authStore.loggedIn;
//
//   // console.log(authStore);
//
//   if (
//     !isLoggedIn && // make sure the user is authenticated
//     to.name !== 'sign-in' // ❗️ Avoid an infinite redirect
//   ) {
//     return { name: 'sign-in' }; // redirect the user to the sign-in page
//   }
// });

router.beforeEach(
  (
    _: RouteLocationNormalizedGeneric,
    __: RouteLocationNormalizedGeneric,
    next,
  ) => {
    ViewUIPlus.LoadingBar.start();
    next();
  },
);

router.afterEach(() => {
  ViewUIPlus.LoadingBar.finish();
});

export default router;
