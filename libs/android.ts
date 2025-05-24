import { parse } from 'json5';
import { AppReleaseABS } from './utils/base';
import HTTPClient from './http';
import { appRelease, AppRelease } from './utils/types';
import { defaultLogger } from './logger';

export default class Android implements AppReleaseABS {
  constructor(
    private readonly logger = defaultLogger.child({
      service: 'app-release-android-service',
    }),
    private readonly http = new HTTPClient(
      'https://play.google.com/store/apps',
    ),
  ) {}

  async getRelease(id: string): Promise<AppRelease | null> {
    const response = await this.http.get({
      path: '/details',
      query: { id, hl: 'en' },
    });
    const html = await response.text();
    const results = html.matchAll(
      /<script \S* nonce="\S+">AF_initDataCallback\((.*?)\);/g,
    );
    let appData;
    for (const match of results) {
      const data: Record<any, any[][][][][][]> = parse(match[1]);
      try {
        appData = {
          platform: 'android',
          versionCode: data['data'][1][2][140][0][0][0] as string,
          packageId: data['data'][1][2][77][0],
          appName: data['data'][1][2][0][0],
          appCategory: data['data'][1][2][79][0][0][0] as string,
          appDescription: data['data'][1][2][72][0][1],
          versionReleaseDate: data['data'][1][2][145][0][0],
          iconUrl: data['data'][1][2][95][0][3][2] as string,
          storeUrl: response.url,
          developerName: data['data'][1][2][37][0],
          userRatingAverage: data['data'][1][2][51]?.[0]?.[1] ?? 0,
          userRatingCount: data['data'][1][2][51]?.[2]?.[1] ?? 0,
        };
      } catch {
        this.logger.info(`Skipping over -- ${match.index}`);
      }
    }
    if (appData) {
      return appRelease.parse(appData);
    }
    return null;
  }
}
