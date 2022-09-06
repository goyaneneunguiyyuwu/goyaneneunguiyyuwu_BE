import { IsEmail, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('kakao_users')
export class KakaoUser {
  @PrimaryColumn()
  @IsNumber()
  kakaoId: number;

  @Column({ type: 'varchar', length: 40 })
  @IsEmail()
  email: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
