import { Global, Module } from '@nestjs/common';
import { RealConfigProvider } from './infrastructure/adapters/real-config-provider';
import { RealDateProvider } from './infrastructure/adapters/real-date-provider';
import { RealEventNotifier } from './infrastructure/adapters/real-event-notifier';
import { RealIdProvider } from './infrastructure/adapters/real-id-provider';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { GlobalListener } from './listeners/global.listener';
import { ConfigProvider } from './ports/config-provider.port';
import { DateProvider } from './ports/date-provider.port';
import { EventNotifier } from './ports/event-notifier.port';
import { IdProvider } from './ports/id-provider.port';

@Global()
@Module({
  providers: [
    PrismaService,
    GlobalListener,
    { provide: IdProvider, useClass: RealIdProvider },
    { provide: DateProvider, useClass: RealDateProvider },
    { provide: ConfigProvider, useClass: RealConfigProvider },
    { provide: EventNotifier, useClass: RealEventNotifier }
  ],
  exports: [PrismaService, IdProvider, DateProvider, ConfigProvider, EventNotifier]
})
export class SharedModule {}
