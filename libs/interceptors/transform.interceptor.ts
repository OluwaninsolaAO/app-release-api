import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

interface ApiResponse<T> {
  statusCode: number;
  status: boolean;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data: T) => ({
        status: true,
        statusCode: statusCode || HttpStatus.OK,
        message: 'Success',
        data: data,
      })),
    );
  }
}
