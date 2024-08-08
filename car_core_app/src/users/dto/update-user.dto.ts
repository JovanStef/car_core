import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    email?:string;

    @IsString()
    @MinLength(4)
    password?:string;
}
