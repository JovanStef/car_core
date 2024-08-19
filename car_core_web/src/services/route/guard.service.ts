import { LocalStorageKeyEnum } from "@/models/local-storage/localStorage.enum"
import { HomeRouteEnum, LoginRouteEnum } from "@/models/routes/routes.enum"
import { LocalStorageService } from "../local-storage/localStorage.service"

export class GuardService{
    static async authGuard(to:any , from:any){
        const isAuthenticated = LocalStorageService.get(LocalStorageKeyEnum.Token)
        console.log(!isAuthenticated &&
          to.name !== LoginRouteEnum.Name);
        
        if (
          !isAuthenticated &&
          to.name !== LoginRouteEnum.Name
        ) {
          
          return { name: LoginRouteEnum.Name }
        }else if (isAuthenticated && to.name == LoginRouteEnum.Name){
          return {name: HomeRouteEnum.Name}
        }
      
    }
}