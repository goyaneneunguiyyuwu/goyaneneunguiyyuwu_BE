import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

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
      const errorResponse = exception.getResponse();
      const errorMessage = (
        errorResponse as {
          statusCode: number;
          message: any;
          error: string;
        }
      ).message;

      const responseBody = {
        statusCode: httpStatus,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else if (exception instanceof QueryFailedError) {
      // 되도록 application layer에서 처리해야함
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        statusCode: httpStatus,
        message: 'database error: ' + exception.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else {
      console.log(exception);
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
