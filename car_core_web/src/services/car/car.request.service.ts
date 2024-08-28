import type { TCar, TCarAll, TCarAllResDto, TCarByIdResDto } from "@/models/car/car.dto.type";
import ApiRequestService from "../api.request.service";
import { CarDto } from "@/models/car/car.dto";

export class CarRequestService extends ApiRequestService {
    override endpoint = 'cars'

    async getAll():Promise<TCarAll[]>{
        try {
            const response = await super.get<TCarAllResDto[]>()
            
            return CarDto.getAllResDto(response)
        } catch (error) {
            throw error
        }
    }

    async getById(id:string):Promise<TCar>{
        try {
            const response = await super.findOne<TCarByIdResDto>(id)
            return CarDto.getByIdResDto(response)
        } catch (error) {
            throw error
        }
    }
}