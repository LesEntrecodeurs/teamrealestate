export class ApiErrorResponse {
  readonly statusCode: number;
  readonly message: string;
  readonly errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
