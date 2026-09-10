import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './health.controller';
import { ApimoModule } from './modules/apimo/apimo.module';
import { ErrorInterceptor } from './shared/application/interceptors/error.interceptor';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ScheduleModule.forRoot(),
    SharedModule,
    ApimoModule
    // Feature modules are registered here as they're built.
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ErrorInterceptor }]
})
export class AppModule {}
