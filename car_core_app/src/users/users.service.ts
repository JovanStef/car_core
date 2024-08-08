import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo:Repository<User>,
    private readonly profilesService:ProfilesService
    ){
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    const profile = new Profile({})
    user.profile = profile
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findBy({id});
  }

  findByEmail(email:string){
    return this.userRepo.findOneBy({email});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({id} , updateUserDto);
  }

  async remove(id: number) {
    const profile = await this.profilesService.findByUser(id)
    await this.profilesService.remove(profile.id)
    return this.userRepo.delete({id});
  }
}
