/* eslint-disable */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store"

Vue.use(VueRouter);

function guardMyroute(to: any, from: any, next: any) {
  store.commit("setAuth")
  const status = store.getters.getLoginStatus
  status ? next() : next("/login")
  !status ? alert("need authentication"):null
}

function guardMyrouteLogin(to: any, from: any, next: any) {
  store.commit("setAuth")
  const status = store.getters.getLoginStatus
  !status ? next("/login") : router.go(-1) 
  status ? alert("you already login"):null
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    beforeEnter: guardMyroute,
    meta: { title: 'Home' },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    beforeEnter: guardMyroute,
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: guardMyrouteLogin,
    component: () => import("../views/Authentication.vue"),
  },
  {
    path: '/404',
    component: () => import("../views/NotFound.vue")
  },
  {
    path: '*',
    redirect: '/404'
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
