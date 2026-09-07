import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventNotifier } from '../../ports/event-notifier.port';

@Injectable()
export class RealEventNotifier extends EventNotifier {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super();
  }

  emit<T extends object>(eventName: string, payload: T): void {
    this.eventEmitter.emit(eventName, payload);
  }
}
