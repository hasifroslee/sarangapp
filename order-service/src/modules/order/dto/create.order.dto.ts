import {IsNumber, IsString, Max, Min} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  readonly user: string;
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(500)
  readonly pump: number;
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(500)
  readonly price: number;
}
