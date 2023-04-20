import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;
    console.log('============================');
    console.log('예외가 발생했어요');
    console.log('예외내용', message);
    console.log('예외 코드', status);
    console.log('============================');

    if (status === 500) {
      return new HttpException('서버무네로 인한 예외', 500);
    }
  }
}
