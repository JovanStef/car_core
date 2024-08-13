import api from "./axios.instance";

export default abstract class ApiRequestService{
endpoint = ''
// private readonly baseUrl = 'http://localhost:3000'
    async post<T>(payload:any):Promise<T>{
        try {
            const response = await api.post(`${this.endpoint}`,{... payload});
            return response.data
        } catch (error) {
            throw error
        }
    }

    async get(){
        return await api.get(`${this.endpoint}`);

    }
    // TODO check token 
    // TODO interceptor axios
    // TODO refresh token axios
    // TODO env
}