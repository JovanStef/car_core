import axios from "axios";

export default abstract class ApiRequestService{
endpoint = ''
target = ''
private readonly baseUrl = 'http://localhost:3000'
    async post<T>(payload:any):Promise<T>{
        try {
            const response = await axios.post(`${this.baseUrl}/${this.endpoint}/${this.target}`,{... payload});
            return response.data
        } catch (error) {
            throw error
        }
    }

    // async get(){
    //     return await axios.get(`${this.baseUrl}/cars`);

    // }

    // TODO interceptor axios
    // TODO refresh token axios
    // TODO env
}