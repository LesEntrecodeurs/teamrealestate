import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { routesV1 } from '../../config/app-routes';
import { ApimoClient } from './domain/ports/apimo-client.port';

/**
 * Proxies the frontend to Apimo so the provider id and token never leave
 * the server.
 */
@Controller()
export class ApimoController {
  constructor(private readonly apimoClient: ApimoClient) {}

  @Get(routesV1.apimo.agencies)
  listAgencies() {
    return this.apimoClient.listAgencies();
  }

  @Get(routesV1.apimo.properties)
  listProperties(@Param('agencyId') agencyId: string, @Query() query: Record<string, string>) {
    return this.apimoClient.listProperties(Number(agencyId), query);
  }

  @Post(routesV1.apimo.leads)
  createLead(@Param('agencyId') agencyId: string, @Body() payload: Record<string, unknown>) {
    return this.apimoClient.createLead(Number(agencyId), payload);
  }
}
