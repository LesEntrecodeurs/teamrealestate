import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigProvider } from '../../ports/config-provider.port';

@Injectable()
export class RealConfigProvider extends ConfigProvider {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  get(key: string): string | undefined {
    return this.configService.get<string>(key);
  }

  getOrThrow(key: string): string {
    return this.configService.getOrThrow<string>(key);
  }
}
