import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Ceshizujian from "../components/ceshizujian";
import home from "../components/home";
import ball from "../components/page/ball";
import ss from "@/components/ss";
import pome from "@/components/pome";
import audios from "@/components/page/audios";
import search from "@/components/page/search";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  {
    path: "/",
    name: "Ceshizujian",
    component: Ceshizujian
  },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/ball",
    name: "ball",
    component: ball
  },
  {
    path: "/ss",
    name: "ss",
    component: ss
  },
  {
    path: "/pome",
    name: "pome",
    component: pome
  },
  {
    path: "/audios",
    name: "audios",
    component: audios
  },
  {
    path: "/search",
    name: "search",
    component: search,
    meta: {
      isBack: true,
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
