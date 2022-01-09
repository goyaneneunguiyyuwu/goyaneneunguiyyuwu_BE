import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sex } from '../../../types';

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

  // @OneToMany()
  // feed_sort

  @ManyToOne(() => User, user => user.pets)
  user: User;
}
