import { ProfileDto } from "../profile/profile.dto";
import type { TUserResDto } from "./user.dto.type";

export class UserDto {
    static userRes(data:TUserResDto):TUserResDto{
        const {id , email , profile} = data
        return {
            id,
            email,
            profile:ProfileDto.profileRes(profile)
        }
    }
}