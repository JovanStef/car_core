import { format } from "date-fns";
import type { TCar, TCarAll, TCarAllResDto, TCarByIdResDto } from "./car.dto.type";

export class CarDto{
    static getAllResDto(cars:TCarAllResDto[]):TCarAll[]{
        return cars.map((car) =>{
            return {
                id: car.id,
                make: car.make,
                model: car.model,
                photo: car.photo ? import.meta.env.VITE_IMAGES_CAR_URL + '/' + car.photo : import.meta.env.VITE_IMAGES_PLACEHOLDER_CAR_URL,
            }
        })
    }

    static getByIdResDto(car:TCarByIdResDto):TCar{
        return{
            id: car.id,
            make: car.make,
            model: car.model,
            photo: car.photo ? import.meta.env.VITE_IMAGES_CAR_URL + '/' + car.photo : import.meta.env.VITE_IMAGES_PLACEHOLDER_CAR_URL,
            mileage: car.mileage,
            year: format(new Date(car.year),'yyyy'),
            winNumber: car.win_number,
            plateNumbers: car.plate_numbers,
            created: format(new Date(car.created_at),'dd/MM/yyyy'),
            modified: format(new Date(car.updated_at),'dd/MM/yyyy'),
        }
    }

}