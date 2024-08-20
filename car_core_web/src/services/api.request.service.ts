import api from "./axios.instance";

export default abstract class ApiRequestService {
  endpoint = "";
  async post<T>(payload: any): Promise<T> {
    try {
      const response = await api.post(`${this.endpoint}`, { ...payload });
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

  async delete<T>(payload?: any): Promise<T> {
    try {
      const response = await api.delete(`${this.endpoint}`, { ...payload });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // TODO env
}
