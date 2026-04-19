import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  company: string;
}