import type { TCar, TCarAll, TCarAllResDto, TCarByIdResDto, TCarUpsert, TCarUpsertDto } from "@/models/car/car.dto.type";
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

    async upsert(car:TCarUpsert):Promise<TCar>{
        try {
            const carDto = CarDto.upsertReqDto(car)
            const response = await super.post<TCarUpsertDto>(carDto,{ headers: {"Content-Type":"multipart/form-data"}}) as any
            return response
        } catch (error) {
            throw error
        }
    }
}