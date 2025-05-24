import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class InternalErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (Object.hasOwn(exceptionResponse as object, 'message')) {
        message = exceptionResponse['message'] as object;
        if (Array.isArray(message)) {
          message = message.join(', ');
        }
      } else {
        message = exceptionResponse as string;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      console.log(exception);
    }
    response.status(status).json({
      status: false,
      statusCode: status,
      message,
      data: null,
    });
  }
}
