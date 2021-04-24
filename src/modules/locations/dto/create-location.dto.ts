import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';
export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  public latitude: number;

  @IsNumber()
  @IsNotEmpty()
  public longitude: number;

  @IsString()
  @MinLength(7)
  public address: string;
}
