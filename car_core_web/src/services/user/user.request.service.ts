import type { TUserResDto } from "@/models/user/user.dto.type";
import ApiRequestService from "../api.request.service";
import { UserDto } from "@/models/user/user.dto";

export default class UserRequstService extends ApiRequestService {
    override endpoint = 'users'

    async getUser():Promise<TUserResDto>{
        try {
            const response = await super.get<TUserResDto[]>()
            return UserDto.userRes(response[0])
        } catch (error) {
            throw error
        }
    }
}