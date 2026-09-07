export abstract class ConfigProvider {
  abstract get(key: string): string | undefined;
  abstract getOrThrow(key: string): string;
}
