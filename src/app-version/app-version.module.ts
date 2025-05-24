import { Module } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { AppVersionController } from './app-version.controller';
import { LogModule } from 'src/log/log.module';

@Module({
  providers: [AppVersionService],
  controllers: [AppVersionController],
  imports: [LogModule],
})
export class AppVersionModule {}
