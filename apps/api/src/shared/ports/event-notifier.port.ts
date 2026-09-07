export abstract class EventNotifier {
  abstract emit<T extends object>(eventName: string, payload: T): void;
}
