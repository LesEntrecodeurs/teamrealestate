import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { IdProvider } from '../../ports/id-provider.port';

@Injectable()
export class RealIdProvider extends IdProvider {
  generate(): string {
    return randomUUID();
  }
}
