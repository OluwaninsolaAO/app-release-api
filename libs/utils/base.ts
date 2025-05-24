import type { AppRelease } from './types';

export interface AppReleaseABS {
  getRelease(packageId: string): Promise<AppRelease | null>;
}
