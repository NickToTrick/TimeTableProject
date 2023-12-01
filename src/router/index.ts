import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import LinesView from "@/views/LinesView.vue";
import StopsView from "@/views/StopsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/lines'
  },
  {
    path: '/lines',
    name: 'Lines',
    component: LinesView,
  },
  {
    path: '/stops',
    name: 'Stops',
    component: StopsView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
