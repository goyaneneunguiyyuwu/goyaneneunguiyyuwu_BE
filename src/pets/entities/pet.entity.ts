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
  // decimal 또는 bigint type은 javascript의 number type에 할당되기에 큰 값이기 때문에 string으로 저장이된다.
  // 따라서 validation 시에는 number로 받지만, javascript 내부에서는 string으로 취급된다.
  // https://stackoverflow.com/questions/42901913/decimal-value-in-postgresql-returned-as-string-in-node-js
  // 아니 근데 이상한게 postgres에 저장되기 전까지는 number가 확실한데,,,?
  // https://github.com/brianc/node-postgres/issues/811
  // 여기에 좀더 명확한 설명이 나와있다. 저장되기전에는 number가 맞고, query로 불러온다면 string이 맞다. 내일 이것에 대해 이야기해 봐야겠다.
  @Column({ type: 'decimal', precision: 3, scale: 1 })
  weight: string;

  @Column()
  neutering: boolean;

  @ManyToOne(() => Family, family => family.pets)
  family: Family;
}
