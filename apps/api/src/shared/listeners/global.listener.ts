import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

/**
 * Logs every domain event that flows through the EventEmitter, regardless of
 * which module emitted it. Add module-scoped listeners next to their module
 * for anything beyond observability.
 */
@Injectable()
export class GlobalListener {
  private readonly logger = new Logger(GlobalListener.name);

  @OnEvent('**')
  onAnyEvent(payload: unknown) {
    this.logger.debug(`Event received: ${JSON.stringify(payload)}`);
  }
}
