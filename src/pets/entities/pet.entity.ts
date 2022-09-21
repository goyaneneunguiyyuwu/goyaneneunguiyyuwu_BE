import { Max, Min } from 'class-validator';
import { Family } from 'src/users/entities/family.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sex } from '../../types';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'int' })
  @Min(1)
  @Max(2)
  species: number;

  @Column({ type: 'int' })
  @Min(1)
  @Max(155)
  breeds: number;

  @Column({ type: 'int', enum: Sex })
  @Min(1)
  @Max(2)
  sex: Sex;

  @Column()
  birthDate: Date;

  @Column()
  togetherDate: Date;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  weight: string;

  @Column()
  neutering: boolean;

  @ManyToOne(() => Family, family => family.pets, { eager: true })
  family: Family;
}
