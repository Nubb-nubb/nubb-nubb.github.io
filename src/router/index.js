import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import WorkshopView from '../views/WorkshopView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ShortsView from '../views/ShortsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/setups',
      redirect: '/projects',
    },
    {
      path: '/workshop',
      name: 'workshop',
      component: WorkshopView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/shorts',
      name: 'shorts',
      component: ShortsView,
    },
  ],
})

export default router
