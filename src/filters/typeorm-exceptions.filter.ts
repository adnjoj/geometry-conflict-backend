import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { EntityColumnNotFound, QueryFailedError, TypeORMError } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Response } from 'express';

@Catch(TypeORMError)
export class TypeOrmExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorMessage = exception.message;

    if (exception instanceof EntityColumnNotFound) {
      errorMessage = 'exceptions.EntityColumnNotFound';
    } else if (exception instanceof QueryFailedError) {
      if (exception.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
        errorMessage = 'exceptions.NoReferencedRow';
      }
    }

    console.log(exception);

    response.status(400).json({
      statusCode: 400,
      messages: [
        await this.i18n.translate(errorMessage, {
          lang: ctx.getRequest().i18nLang,
          args: {},
        }),
      ],
    });
  }
}
