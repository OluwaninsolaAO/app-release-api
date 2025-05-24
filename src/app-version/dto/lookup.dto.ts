import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class LookupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  packageId: string;

  @IsIn(['ios', 'android'])
  @ApiProperty({ enum: ['ios', 'android'] })
  platform: 'ios' | 'android';
}
