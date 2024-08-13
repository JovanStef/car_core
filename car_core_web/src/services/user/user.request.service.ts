import ApiRequestService from "../api.request.service";

export default class UserRequstService extends ApiRequestService {
    override endpoint = 'users/1'

    async getUser(){
        try {
            const response = await super.get()
            return response.data
        } catch (error) {
            throw error
        }
    }
}