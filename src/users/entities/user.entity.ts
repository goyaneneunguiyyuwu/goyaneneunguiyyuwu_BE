import { IsEmail, IsString } from 'class-validator';
import { Family } from 'src/users/entities/family.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  @IsEmail()
  email!: string;

  @Column('varchar')
  @IsString()
  name!: string;

  @Column('varchar')
  @IsString()
  password!: string;

  @Column('varchar')
  @IsString()
  provider!: 'local' | 'kakao';

  @ManyToOne(() => Family, family => family.users)
  family?: Family;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
