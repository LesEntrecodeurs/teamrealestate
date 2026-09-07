import { Controller, Get } from '@nestjs/common';
import { routesV1 } from './config/app-routes';

@Controller()
export class HealthController {
  @Get(routesV1.ping)
  ping() {
    return { status: 'ok' };
  }
}
