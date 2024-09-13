import { GuardService } from "@/services/route/guard.service";
import { createRouter, createWebHistory } from "vue-router";
import {
  CarDetailsRouteEnum,
  HomeRouteEnum,
  LoginRouteEnum,
  NotFoundRouteEnum,
  ServiceSheetsRouteEnum,
} from "@/models/routes/routes.enum";
import { FullPageSpinnerUiService } from "@/services/ui/fullPageSpinner.ui.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LoginRouteEnum.Path,
      name: LoginRouteEnum.Name,
      component: () => import("../views/LoginView.vue"),
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: HomeRouteEnum.Path,
      name: HomeRouteEnum.Name,
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: ServiceSheetsRouteEnum.Path,
      name: ServiceSheetsRouteEnum.Name,
      component: () => import("../views/ServiceSheetsView.vue"),
    },
    {
      path:`${CarDetailsRouteEnum.Path}/:id`,
      name:CarDetailsRouteEnum.Name,
      component:() => import('../views/CarDetails.vue'),
    },
    {
      path: NotFoundRouteEnum.Path,
      name: NotFoundRouteEnum.Name,
      component: () => import("../views/NotFoundView.vue"),
      meta: {
        hideNavbar: true,
      },
    },
    { path: "/:pathMatch(.*)*", redirect: NotFoundRouteEnum.Path },
  ],
});

router.beforeEach(async(to, from,next)=>{
  FullPageSpinnerUiService.setIsLoading(true);
  
  const path = await GuardService.authGuard(to, from)
  next(path)
});

router.afterEach(() => {
  FullPageSpinnerUiService.setIsLoading(false);
})

export default router;
