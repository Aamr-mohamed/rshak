import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Admin {
  @ApiProperty({ example: 'admin@example.com', required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 123456, required: true })
  @IsNotEmpty()
  password: string;
}
