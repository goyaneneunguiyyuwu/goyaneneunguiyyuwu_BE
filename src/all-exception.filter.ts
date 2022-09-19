import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();

      const responseBody = {
        statusCode: httpStatus,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else {
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        statusCode: httpStatus,
        message: 'unknown',
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
