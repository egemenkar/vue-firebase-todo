import Vue from 'vue'
import VueRouter from 'vue-router'
//import ToDo from '../views/ToDo.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "ToDoPrivate",
    meta: { requiresAuth: true },
    component: () => import("../views/ToDoPrivate.vue"),
  },
  {
    path: "/public",
    name: "ToDoPublic",
    meta: { requiresAuth: true },
    component: () => import("../views/ToDoPublic.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresGuest: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresGuest: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  const auth = getAuth();
  const user = auth.currentUser;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      // No user is signed in
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (user) {
      // Go to app
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    next();
  }
});

export default router
