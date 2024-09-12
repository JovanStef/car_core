import type { TloginReqDto, TloginResDto } from "@/models/auth/auth.dto.type";
import ApiRequestService from "../api.request.service";
import { LocalStorageService } from "../local-storage/localStorage.service";
import { LocalStorageKeyEnum } from "@/models/local-storage/localStorage.enum";

export default class AuthenticationRequestService extends ApiRequestService{
    override endpoint = 'auth/login'

    async login(payload:TloginReqDto){
        try {
            const {accessToken , refreshToken} = await super.post<TloginResDto>({... payload })
            LocalStorageService.set(LocalStorageKeyEnum.Token , accessToken)
            LocalStorageService.set(LocalStorageKeyEnum.RefreshToken , refreshToken)
        } catch (error) {
            throw error
        }
       
    }

    async logout(){
        try {
            this.endpoint = 'auth'
            const refreshToken = LocalStorageService.get(LocalStorageKeyEnum.RefreshToken)
             LocalStorageService.clear()
           const response = await super.delete('logout',refreshToken)
           return response
        } catch (error) {
            throw error
        }
    }


}