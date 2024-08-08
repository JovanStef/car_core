import type { TloginReqDto } from "@/models/auth/auth.dto.type";

export class AuthDto{
    static loginReq(email :string , password:string):TloginReqDto{
        email = email.replace(/\s/g, "");
        password = password.replace(/\s/g, "");
        return {
            email,
            password
        }
    }
}