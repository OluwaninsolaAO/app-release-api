import { parse } from 'json5';
import { AppReleaseABS } from './common/base';
import HTTPClient from './common/http';
import { appRelease, AppRelease } from './common/types';

export default class Android implements AppReleaseABS {
  private readonly http = new HTTPClient('https://play.google.com/store/apps');

  async getRelease(id: string): Promise<AppRelease | null> {
    const response = await this.http.get({
      path: '/details',
      query: { id },
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
          userRatingAverage: data['data'][1][2][51][0][1],
          userRatingCount: data['data'][1][2][51][2][1],
        };
      } catch {
        console.log(`Skipping over -- ${match.index}`);
      }
    }
    if (appData) {
      return appRelease.parse(appData);
    }
    return null;
  }
}
