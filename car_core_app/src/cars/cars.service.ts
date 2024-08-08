import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CarsService {

  constructor(
    @InjectRepository(Car) private carRepo:Repository<Car>,
    private readonly userService:UsersService
    ){
  }
  async create(createCarDto: CreateCarDto , user_id:number) {
    const car = new Car(createCarDto)
    const user = await this.userService.findOne(user_id)
    car.user = user[0]
    return await this.carRepo.save(car);
  }

  findAll() {
    return `This action returns all cars`;
  }

  async findOne(id: number) {
    return await this.carRepo.findOneBy({id})
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    return await this.carRepo.update({id} , updateCarDto)
  }

  remove(id: number) {
    return this.carRepo.delete({id})
  }
}
