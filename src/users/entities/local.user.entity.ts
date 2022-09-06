import { IsEmail, IsString } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
@Entity('local_users')
export class LocalUser {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  @IsEmail()
  email: string;

  @Column('varchar')
  @IsString()
  password: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
