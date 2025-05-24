import { Injectable, NotFoundException } from '@nestjs/common';
import Android from 'libs/android';
import iOS from 'libs/ios';
import { AppReleaseABS } from 'libs/utils/base';
import { LogService } from 'src/log/log.service';

@Injectable()
export class AppVersionService {
  private readonly PROVIDERS: Record<string, AppReleaseABS>;
  constructor(private readonly log: LogService) {
    this.PROVIDERS = {
      ios: new iOS(log.logger),
      android: new Android(log.logger),
    };
  }
  async lookup(packageId: string, platform: 'ios' | 'android') {
    const provider = this.PROVIDERS[platform];
    const appData = await provider.getRelease(packageId);
    if (!appData) {
      throw new NotFoundException(
        `App Release ${platform}:${packageId} not found.`,
      );
    }
    return appData;
  }
}
