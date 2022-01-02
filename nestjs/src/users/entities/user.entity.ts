import {
  IsEmail,
  IsString,
} from 'class-validator'
import { Pet } from "src/pets/entities/pet.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar")
  @IsEmail()
  email!: string;

  @Column("varchar")
  @IsString()
  name!: string;

  @Column("varchar")
  @IsString()
  password!: string;

  // @OneToMany(() => Pet, pet => pet.id)
  // pets: Pet[];
}
