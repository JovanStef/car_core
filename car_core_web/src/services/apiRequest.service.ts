import axios from "axios";

export default abstract class ApiRequestService{
endpoint = ''
target = ''
private readonly baseUrl = 'http://localhost:3000'
    async post(payload:any){
        return await axios.post(`${this.baseUrl}/${this.endpoint}/${this.target}`,{... payload});
    }

    // async get(){
    //     return await axios.get(`${this.baseUrl}/cars`);

    // }
}