import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from './api-error.response';

export function toApiErrorResponse(exception: unknown): {
  status: number;
  body: ApiErrorResponse;
} {
  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    const response = exception.getResponse();

    if (typeof response === 'object' && response !== null && 'message' in response) {
      const message = (response as { message: string | string[] }).message;
      return {
        status,
        body: new ApiErrorResponse(
          status,
          Array.isArray(message) ? exception.message : message,
          Array.isArray(message) ? message : undefined
        )
      };
    }

    return { status, body: new ApiErrorResponse(status, exception.message) };
  }

  const message = exception instanceof Error ? exception.message : 'Unexpected error';
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    body: new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, message)
  };
}
