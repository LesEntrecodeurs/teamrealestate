import { Injectable } from '@nestjs/common';
import { DateProvider } from '../../ports/date-provider.port';

@Injectable()
export class RealDateProvider extends DateProvider {
  now(): Date {
    return new Date();
  }
}
