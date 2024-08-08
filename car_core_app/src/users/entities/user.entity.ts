import { Profile } from 'src/profiles/entities/profile.entity';
import { Entity, Column, PrimaryGeneratedColumn , OneToOne , OneToMany,JoinColumn , Unique , CreateDateColumn , UpdateDateColumn ,DeleteDateColumn , BeforeInsert} from 'typeorm';
import { HashService } from 'src/auth/hash/hash.service';
import { Car } from 'src/cars/entities/car.entity';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @OneToOne(() => Profile , (profile)=>profile.user, { eager:true,onDelete:"CASCADE",
    cascade:true})
  @JoinColumn()
  profile:Profile

  @OneToMany(() => Car , (car)=>car.user, { onDelete:"CASCADE",
  cascade:true})
  @JoinColumn()
  car:Car

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
   hashPassword(){
    this.password = HashService.hash(this.password)
  }

  constructor(user){
    Object.assign(this , user)
}
}


