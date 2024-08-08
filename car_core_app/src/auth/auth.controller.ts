import { Controller, Body, Ip, Req, Post, Delete, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    const { email, password } = body;
    const values = {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    };
    try {
       return this.authService.login(email, password, values);
    } catch (error) {
      throw error
    }
    
  }

  @Post('refresh')
  async refreshToken(@Body() body:RefreshTokenDto){
    const {refreshToken} = body
    return this.authService.refresh(refreshToken)
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto){
    const {refreshToken} = body
    return this.authService.logout(refreshToken)
  }
}
