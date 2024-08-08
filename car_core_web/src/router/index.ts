import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { LocalStorageService } from '@/services/local-storage/localStorage.service'
import { LocalStorageKeyEnum } from '@/models/local-storage/localStorage.enum'
import { HomeRouteEnum, LoginRouteEnum } from '@/models/routes/routes.enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HomeRouteEnum.Path,
      name: HomeRouteEnum.Name,
      component: () => import('../views/HomeView.vue')

    },
    {
      path: LoginRouteEnum.Path,
      name: LoginRouteEnum.Name,
      component: () => import('../views/LoginView.vue'),
      meta: {
        hideNavbar: true,
       }
    }
  ]
  // TODO 404 view
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = LocalStorageService.get(LocalStorageKeyEnum.Token)
  if (
    !isAuthenticated &&
    to.name !== LoginRouteEnum.Name
  ) {
    return { name: LoginRouteEnum.Name }
  }
})

export default router
