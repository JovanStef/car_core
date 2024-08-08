export type TloginReqDto = {
    email: string,
    password: string
}

export type TloginResDto = {
    refreshToken: string,
    accessToken:string

}