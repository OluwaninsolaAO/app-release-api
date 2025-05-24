import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class ReleaseDto {
  @IsString()
  @ApiProperty()
  packageId: string;

  @IsString()
  @ApiProperty()
  appName: string;

  @IsString()
  @ApiProperty()
  appCategory: string;

  @IsString()
  @ApiProperty()
  appDescription: string;

  @IsString()
  @ApiProperty()
  versionCode: string;

  @IsString()
  @ApiProperty()
  versionReleaseDate: string;

  @IsString()
  @ApiProperty()
  iconUrl: string;

  @IsString()
  @ApiProperty()
  storeUrl: string;

  @IsIn(['ios', 'android'])
  @ApiProperty()
  platform: 'ios' | 'android';

  @IsString()
  @ApiProperty()
  developerName: string;

  @IsNumber()
  @ApiProperty()
  userRatingAverage: number;

  @IsNumber()
  @ApiProperty()
  userRatingCount: number;

  @IsString()
  @ApiProperty()
  developerIconUrl: string;
}
