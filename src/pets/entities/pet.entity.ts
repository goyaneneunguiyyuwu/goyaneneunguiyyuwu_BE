import { Family } from 'src/users/entities/family.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sex } from '../../types';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  species: string;

  @Column()
  name: string;

  @Column()
  birth: Date;

  @Column()
  together: Date;

  @Column()
  sex: Sex;

  @ManyToOne(() => Family, family => family.pets)
  family: Family;
}
