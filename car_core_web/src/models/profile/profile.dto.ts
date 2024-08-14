import type { TProfileResDto } from "./profile.dto.type";

export class ProfileDto {
    static profileRes(data:TProfileResDto):TProfileResDto{
        const {id , name , photo} = data
        return {
             id,
             name,
             photo,
        }
    }
}