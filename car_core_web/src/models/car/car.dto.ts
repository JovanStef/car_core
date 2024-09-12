import { format } from "date-fns";
import type { TCar, TCarAll, TCarAllResDto, TCarByIdResDto, TCarUpsert } from "./car.dto.type";

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
            vinNumber: car.vin_number,
            plateNumbers: car.plate_numbers,
            created: format(new Date(car.created_at),'dd/MM/yyyy'),
            modified: format(new Date(car.updated_at),'dd/MM/yyyy'),
        }
    }

    static upsertReqDto(car:TCarUpsert):FormData{
        const errors = {}
        for (const element in car) {
            if(!car[element]){
                errors[element] = `${element} is required`
            }
        }
        if(Object.keys(errors).length > 0){
            throw errors
        }
        const {make , model , photo,mileage,year,vinNumber,plateNumbers} = car 
        const formData = new FormData()
        formData.append('_method', 'post')
        formData.append('make', make)
        formData.append('model',model)
        formData.append('photo',photo)
        formData.append('mileage',mileage)
        formData.append('year',year)
        formData.append('vin_number',vinNumber)
        formData.append('plate_numbers',plateNumbers)


        return formData
    }

}