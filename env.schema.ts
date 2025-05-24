import { z } from 'zod';
import { config } from 'dotenv';

config({ path: '.env' });

export const envSchema = z.object({
  // App Setup and Configurations
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z
    .string()
    .default('5000')
    .transform((val) => parseInt(val)),
  HTTP_LOG_FORMAT: z
    .union([z.enum(['combined', 'dev', 'short', 'tiny']), z.string()])
    .default('dev'),
  APP_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Project Details
  PROJECT_TITLE: z.string().default('Nest App'),
  PROJECT_DESCRIPTION: z.string().nullish(),
  PROJECT_VERSION: z.string().default('1.0.0'),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
