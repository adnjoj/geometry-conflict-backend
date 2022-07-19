import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const { message } = exception.getResponse() as {
      message: string | string[];
    };

    console.log(message);

    const messages = typeof message === 'string' ? [message] : message;
    const translatedMessages = [];

    for (const message of messages) {
      const [key, argsString] = message.split('#');
      const args = JSON.parse(argsString);

      translatedMessages.push(
        await this.i18n.translate(key, {
          lang: ctx.getRequest().i18nLang,
          args,
        }),
      );
    }

    response
      .status(statusCode)
      .json({ statusCode, messages: translatedMessages });
  }
}
