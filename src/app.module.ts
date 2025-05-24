import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppVersionModule } from './app-version/app-version.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from 'env.schema';
import { loggerMiddlewareFactory } from 'common/middlewares/logger.middleware';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: (config) => envSchema.parse(config) }),
    AppVersionModule,
    LogModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddlewareFactory(this.configService)).forRoutes('*');
  }
}
