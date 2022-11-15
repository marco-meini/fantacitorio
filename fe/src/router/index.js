import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { sessionStore } from "../stores/session";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/punteggi",
      name: "punteggi",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PunteggiView.vue")
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue")
    }
  ]
});

router.beforeEach((to) => {
  const session = sessionStore();

  if (to.meta.requiresAuth && !session.isAuthenticated) {
    return "/login";
  }
});

export default router;
