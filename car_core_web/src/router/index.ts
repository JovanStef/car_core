import { createRouter, createWebHistory } from 'vue-router'
import { HomeRouteEnum, LoginRouteEnum, NotFoundRouteEnum } from '@/models/routes/routes.enum'
import { GuardService } from '@/services/route/guard.service'

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
    },
    { path: NotFoundRouteEnum.Path, 
      name: NotFoundRouteEnum.Name ,
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        hideNavbar: true,
       } },  
  { path: '/:pathMatch(.*)*', redirect: NotFoundRouteEnum.Path },  
  ]
})

router.beforeEach(GuardService.authGuard)

export default router
