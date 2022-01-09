import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({type:'string'})
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({type:'string'})
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty({type:'string'})
  @IsString()
  password!: string;
}
