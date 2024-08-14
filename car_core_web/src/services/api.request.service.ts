import api from "./axios.instance";

export default abstract class ApiRequestService{
endpoint = ''
    async post<T>(payload:any):Promise<T>{
        try {
            const response = await api.post(`${this.endpoint}`,{... payload});
            return response.data
        } catch (error) {
            throw error
        }
    }

    async get<T>():Promise<T>{
try {
    const response =  await api.get(`${this.endpoint}`);
    return response.data
} catch (error) {
    throw error
}


    }
 
    // TODO refresh token axios
    // TODO env
}