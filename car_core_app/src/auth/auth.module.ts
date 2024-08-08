import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashService } from './hash/hash.service';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy, HashService]
})
export class AuthModule {}
