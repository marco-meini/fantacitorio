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
      path: "/puntate",
      name: "puntate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PuntateView.vue")
    },
    {
      path: "/squadre",
      name: "squadre",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SquadreView.vue")
    },
    {
      path: "/gestione-giornate",
      name: "gestione-giornate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/GestioneGiornate.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/gestione-giornata/:puntata?",
      name: "gestione-giornata",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/GestioneGiornata.vue"),
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

router.beforeEach(async (to, from) => {
  const session = sessionStore();

  if (to.meta.requiresAuth && !session.isAuthenticated && session.loaded) {
    return "/login";
  }
});

export default router;
