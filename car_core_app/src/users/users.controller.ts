import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(UsersInterceptor)
   create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UsersInterceptor)
  async findOne(@CurrentUser() user) {
    try {
      return await this.usersService.findOne(+user.userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
