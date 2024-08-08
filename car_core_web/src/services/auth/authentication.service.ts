import type { TloginReqDto, TloginResDto } from "@/models/auth/auth.dto.type";
import ApiRequestService from "../apiRequest.service";
import { LocalStorageService } from "../local-storage/localStorage.service";
import { LocalStorageKeyEnum } from "@/models/local-storage/localStorage.enum";

export default class AuthenticationService extends ApiRequestService{
    override endpoint = 'auth'
    override target = 'login'

    async login(payload:TloginReqDto){
        try {
            const response = await super.post<TloginResDto>({... payload})
            LocalStorageService.set(LocalStorageKeyEnum.Token , response.accessToken)
        } catch (error) {
            throw error
        }
       
    }


}