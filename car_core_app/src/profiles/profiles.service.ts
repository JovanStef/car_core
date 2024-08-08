import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'


@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private profilesRepo:Repository<Profile>){
  }

  create(createProfileDto: CreateProfileDto) {
    const profile = new Profile(createProfileDto)
    return this.profilesRepo.create(profile);
  }

  findAll() {
    return this.profilesRepo.find();
  }

  findOne(id: number) {
    return this.profilesRepo.findBy({id});
  }

  findByUser(id:number){
    return this.profilesRepo.findOne({where: { user: { id }}})
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return this.profilesRepo.delete({id});
  }
}
