import { Pet } from 'src/pets/entities/pet.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('family')
export class Family {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, user => user.family, { cascade: true })
  users?: User[];

  @OneToMany(() => Pet, pet => pet.family, { cascade: true })
  pets?: Pet[];
}
