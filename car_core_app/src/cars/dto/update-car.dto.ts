import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { MinLength, IsNumber, IsDate,IsString } from "@nestjs/class-validator";

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @IsString()
    @MinLength(4)
    make?:string

    @IsString()
    model?:string

    photo?: string;
    
    @IsNumber()
    mileage?: number;
    
    year?: string;
    
    @MinLength(10)
    win_number?: string;
    
    @MinLength(4)
    plate_numbers?: string;
}
