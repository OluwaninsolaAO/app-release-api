import { AppReleaseABS } from './utils/base';
import HTTPClient from './http';
import { appRelease } from './utils/types';
import type { AppRelease } from './utils/types';
import { defaultLogger } from './logger';

type ApiResponse = {
  resultCount: number;
  results: Record<string, any>[];
};

export default class iOS implements AppReleaseABS {
  constructor(
    private readonly logger = defaultLogger.child({
      service: 'app-release-ios-service',
    }),
    private readonly http = new HTTPClient('https://itunes.apple.com'),
  ) {}
  async getRelease(bundleId: string): Promise<AppRelease | null> {
    const response = await this.http.get({
      path: '/lookup',
      query: { bundleId },
      headers: { Accepts: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching App Release: Status Code - ${response.status}`,
      );
    }
    const data = (await response.json()) as ApiResponse;
    if (data.resultCount === 0) {
      return null;
    }

    const result = data.results.find((item) => {
      const key = item['bundleId'] as string;
      return key.toLocaleLowerCase() === bundleId.toLocaleLowerCase();
    });
    if (!result) {
      return null;
    }
    const appData = {
      packageId: result['bundleId'] as string,
      appName: result['trackName'] as string,
      appCategory: result['primaryGenreName'] as string,
      appDescription: result['description'] as string,
      versionCode: result['version'] as string,
      versionReleaseDate: result['currentVersionReleaseDate'] as string,
      iconUrl: result['artworkUrl512'] as string,
      storeUrl: result['trackViewUrl'] as string,
      platform: 'ios',
      developerName: result['artistName'] as string,
      userRatingAverage: result['averageUserRating'] as number,
      userRatingCount: result['userRatingCount'] as number,
    };
    return appRelease.parse(appData);
  }
}
