import httpStatusCode from 'http-status-codes';

export interface IError {
  message: string;
  code: number;
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
        code: error.code,
        error: error.codeAsString
          ? error.codeAsString
          : httpStatusCode.getStatusText(error.code),
        ...(error.documentation && { documentation: error.documentation }),
        ...(error.description && { description: error.description }),
      };
    } catch (_) {
      return { error: error.message || error.toString() };
    }
  }
}
