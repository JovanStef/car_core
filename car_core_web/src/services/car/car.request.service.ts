import ApiRequestService from "../api.request.service";

export class CarRequestService extends ApiRequestService {
    override endpoint = 'cars'

    async getAll():Promise<any[]>{
        try {
            const response = await super.get<any[]>()
    // TODO make DTO for cars

            return response
        } catch (error) {
            throw error
        }
    }
}