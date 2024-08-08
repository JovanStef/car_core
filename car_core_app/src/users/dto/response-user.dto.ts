export class ResponseUserDto{
    id:number
    email:string
    profile:any

    constructor({id ,email , profile}){
        Object.assign(this , {id ,email , profile})
    }
}