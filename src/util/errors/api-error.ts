import httpStatusCode from 'http-status-codes';

export interface IError {
  message: string;
  statusCode: number;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface IErrorResponse extends Partial<Omit<IError, 'codeAsString'>> {
  error: string;
}

export class APIError {
  public static format(error: IError): IErrorResponse {
    try {
      return {
        message: error.message,
        statusCode: error.statusCode,
        error: error.codeAsString
          ? error.codeAsString
          : httpStatusCode.getStatusText(error.statusCode),
        ...(error.documentation && { documentation: error.documentation }),
        ...(error.description && { description: error.description }),
      };
    } catch (_) {
      return { error: error.message || error.toString() };
    }
  }
}
