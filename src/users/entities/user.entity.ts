import { IsEmail, isEmail, IsString } from 'class-validator';
import { Family } from 'src/users/entities/family.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar')
  @IsString()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  profileImage: string;

  @ManyToOne(() => Family, family => family.users)
  family: Family;
}
