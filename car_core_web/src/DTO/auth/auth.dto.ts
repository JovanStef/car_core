export class AuthLoginDto{
    email:string
    password:string
constructor(email:string , password:string){
this.email = email.trim()
this.password = password.trim()
}
}