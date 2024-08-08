import { IsNotEmpty } from "@nestjs/class-validator";

export default class RefreshTokenDto{
    @IsNotEmpty()
    refreshToken:string
}