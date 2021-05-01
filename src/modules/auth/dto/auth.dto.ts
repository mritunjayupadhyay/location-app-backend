import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
