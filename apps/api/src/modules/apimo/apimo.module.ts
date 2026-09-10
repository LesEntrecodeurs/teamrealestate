import { Module } from '@nestjs/common';
import { ApimoController } from './apimo.controller';
import { ApimoClient } from './domain/ports/apimo-client.port';
import { RealApimoClient } from './infrastructure/adapters/real-apimo-client';

@Module({
  controllers: [ApimoController],
  providers: [{ provide: ApimoClient, useClass: RealApimoClient }]
})
export class ApimoModule {}
