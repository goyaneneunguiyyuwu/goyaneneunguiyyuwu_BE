import { IsEmail, IsString } from 'class-validator';
import { Family } from 'src/users/entities/family.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  nickName: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  profileImage: string;

  @ManyToOne(() => Family, family => family.users, { eager: true })
  @JoinColumn()
  family: Family;
}
