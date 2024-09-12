import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ClassSerializerInterceptor, UnprocessableEntityException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/static/images.service';
@Controller('cars')
export class CarsController {
    
    constructor(private readonly carsService: CarsService , private imagesService:ImagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('photo'))
  async create(@CurrentUser() user , @UploadedFile() file, @Body() createCarDto: CreateCarDto) {
    try {
      const imageName = await this.imagesService.writeFileToFolder(file,process.env.IMAGES_CAR_WRITE_DIR)
      createCarDto.photo = imageName
      return await this.carsService.create(createCarDto , user);
    } catch (error) {
      throw new UnprocessableEntityException()
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user) {
    return this.carsService.findAll(user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const car = await this.carsService.findOne(+id);
    await this.imagesService.deleteFileFromFolder(car.photo , process.env.IMAGES_CAR_WRITE_DIR)
    return this.carsService.remove(+id);
  }
}
