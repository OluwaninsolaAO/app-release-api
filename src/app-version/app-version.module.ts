import { Module } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { AppVersionController } from './app-version.controller';

@Module({
  providers: [AppVersionService],
  controllers: [AppVersionController],
})
export class AppVersionModule {}
