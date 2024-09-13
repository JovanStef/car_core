import { LocalStorageKeyEnum } from "@/models/local-storage/localStorage.enum";
import { HomeRouteEnum, LoginRouteEnum } from "@/models/routes/routes.enum";
import { LocalStorageService } from "../local-storage/localStorage.service";

export class GuardService{
    static async authGuard(to:any , from:any ):Promise<any>{
        const isAuthenticated = LocalStorageService.get(LocalStorageKeyEnum.Token)
        if (
          !isAuthenticated &&
          to.name !== LoginRouteEnum.Name
        ) {
          
          return LoginRouteEnum.Path
        }
        else if (isAuthenticated && to.name == LoginRouteEnum.Name){
          return HomeRouteEnum.Path
        }
      
    }
}