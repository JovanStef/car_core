import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Unique(['win_number', 'plate_numbers'])
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;
  
  @Column()
  model: string;
  
  @Column({nullable:true})
  photo: string;
  
  @Column()
  mileage: number;
  
  @Column({nullable:true})
  year: string;
  
  @Column()
  win_number: string;
  
  @Column()
  plate_numbers: string;

  @ManyToOne(() => User , (user) => user.car)
  user:User

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(car){
    Object.assign(this , car)
}

}
