import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { HashService } from 'src/auth/hash/hash.service';
import { Car } from 'src/cars/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile , Car]) ],
  exports:[UsersService],
  controllers: [UsersController],
  providers: [UsersService , ProfilesService , HashService]
})
export class UsersModule {}
