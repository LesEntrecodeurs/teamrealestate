import {
  type CallHandler,
  type ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  type NestInterceptor
} from '@nestjs/common';
import { catchError, type Observable, throwError } from 'rxjs';
import { toApiErrorResponse } from '../../api/api-error.handler';

/**
 * Logs unexpected (5xx) errors and normalizes every thrown error into the
 * ApiErrorResponse shape, then rethrows so Nest's own HTTP layer writes the
 * response — this never touches the response object itself.
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((exception: unknown) => {
        const { status, body } = toApiErrorResponse(exception);

        if (status >= 500) {
          this.logger.error(exception instanceof Error ? exception.stack : exception);
        }

        return throwError(() => new HttpException(body, status));
      })
    );
  }
}
