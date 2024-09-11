import type { AxiosRequestConfig } from "axios";
import api from "./axios.instance";

export default abstract class ApiRequestService {
  endpoint = "";
  async post<T>(payload: any, config?:AxiosRequestConfig<any> | undefined): Promise<T> {
    try {
      const response = await api.post(`${this.endpoint}`, payload, {...config}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(): Promise<T> {
    try {
      const response = await api.get(`${this.endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findOne<T>(id:string):Promise<T>{
    try {
        const response = await api.get(`${this.endpoint}/${id}`);
        return response.data;
  
    } catch (error) {
        throw error
    }
  }

  async delete<T>(id?: any , payload?:any): Promise<T> {
    // TODO dynamic params 
    try {
      const response = await api.delete(`${this.endpoint}/${id}`,{...payload});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
