import { Injectable } from '@nestjs/common';
import { ConfigProvider } from '../../../../shared/ports/config-provider.port';
import { ApimoClient } from '../../domain/ports/apimo-client.port';

/**
 * Apimo authenticates with HTTP Basic Auth: username is the 4-digit
 * provider id, password is the API token. Both come from Apimo support,
 * never hardcoded — see apps/api/.env.example.
 */
@Injectable()
export class RealApimoClient extends ApimoClient {
  constructor(private readonly config: ConfigProvider) {
    super();
  }

  listAgencies(): Promise<unknown> {
    return this.request('/agencies');
  }

  listProperties(agencyId: number, query: Record<string, string | number> = {}): Promise<unknown> {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)]))
    ).toString();
    return this.request(`/agencies/${agencyId}/properties${params ? `?${params}` : ''}`);
  }

  createLead(agencyId: number, payload: Record<string, unknown>): Promise<unknown> {
    return this.request(`/agencies/${agencyId}/leads`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  private async request(path: string, init: RequestInit = {}): Promise<unknown> {
    const providerId = this.config.get('APIMO_PROVIDER_ID');
    const token = this.config.get('APIMO_TOKEN');
    if (!providerId || !token) {
      throw new Error('Apimo is not configured: set APIMO_PROVIDER_ID and APIMO_TOKEN');
    }

    const baseUrl = this.config.get('APIMO_BASE_URL') ?? 'https://api.apimo.pro';
    const credentials = Buffer.from(`${providerId}:${token}`).toString('base64');

    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Apimo API error ${response.status} on ${path}: ${await response.text()}`);
    }

    return response.json();
  }
}
