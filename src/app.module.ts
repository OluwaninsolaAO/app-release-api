import { Module } from '@nestjs/common';
import { AppVersionModule } from './app-version/app-version.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env.schema';

@Module({
  imports: [
    AppVersionModule,
    ConfigModule.forRoot({ validate: (config) => envSchema.parse(config) }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
