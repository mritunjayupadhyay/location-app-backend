import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @MinLength(4)
  public password: string;
}
