import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception ? exception.getStatus() : 500;

    response.status(500).json({
      error: true,
      message: exception.toString(),
      path: request.url,
      stack: exception,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
