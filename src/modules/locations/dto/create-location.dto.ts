import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  public latitude: number;

  @IsNumber()
  @IsNotEmpty()
  public longitude: number;

  @IsString()
  public address: string;
}
