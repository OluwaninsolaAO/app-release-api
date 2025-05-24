import { z } from 'zod';

export const platformEnum = z.enum(['ios', 'android']);

export const appRelease = z.object({
  packageId: z.string(),

  appName: z.string(),
  appCategory: z.string(),
  appDescription: z.string(),

  versionCode: z.string(),
  versionReleaseDate: z.string(),

  iconUrl: z.string(),
  storeUrl: z.string(),
  platform: platformEnum,

  developerName: z.string(),
  developerIconUrl: z.string().nullish(),

  userRatingAverage: z.number(),
  userRatingCount: z.number(),
});

export type PlatformEnumType = z.infer<typeof platformEnum>;
export type AppRelease = z.infer<typeof appRelease>;
