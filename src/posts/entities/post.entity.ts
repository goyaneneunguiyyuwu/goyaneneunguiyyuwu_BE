import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(()=> Urine)
  urine: Urine

  @OneToOne(()=> Excrement)
  excrement: Excrement
  @OneToOne()
  @OneToOne()
  @OneToOne()
  @OneToOne()
  @OneToOne()


}



- id
- urine(FK) one-one
- excrement(FK) one-one
- feeds(FK) one-one
- snacks(FK) one-one
- drinking(FK) one-one
- water: boolean
- sand: boolean(only for cat)
- petId(FK)
- (beauty_records) one-many
- (health_records) one-many