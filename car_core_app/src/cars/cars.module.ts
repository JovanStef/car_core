import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car , User,Profile])],

  controllers: [CarsController],
  providers: [CarsService , UsersService , ProfilesService]
})
export class CarsModule {}
