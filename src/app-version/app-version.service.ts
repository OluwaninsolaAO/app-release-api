import { Injectable, NotFoundException } from '@nestjs/common';
import Android from 'libs/android';
import iOS from 'libs/ios';

const PROVIDERS = {
  ios: new iOS(),
  android: new Android(),
};

@Injectable()
export class AppVersionService {
  async lookup(packageId: string, platform: 'ios' | 'android') {
    const provider = PROVIDERS[platform];
    const appData = await provider.getRelease(packageId);
    if (!appData) {
      throw new NotFoundException(
        `App Release ${platform}:${packageId} not found.`,
      );
    }
    return appData;
  }
}
