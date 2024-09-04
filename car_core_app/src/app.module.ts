import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/entities/car.entity';
import { StaticImagesModule } from './static/images.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User , Profile , Car],
      synchronize: true,
    }),
    UsersModule,
    ProfilesModule,
    AuthModule,
    CarsModule,
    StaticImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
