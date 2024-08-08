export class ResponseProfileDto{
    id:number
    name:string
    photo:any

    constructor({id ,name , photo}){
        Object.assign(this , {id ,name , photo})
    }
}