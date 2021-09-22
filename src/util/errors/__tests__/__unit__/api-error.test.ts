import { APIError, IError } from '../../api-error';

describe('APIError', () => {
  it('should format error with mandatory fields', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'Testlink Id not found!',
    });
    expect(error).toEqual({
      msg: 'Testlink Id not found!',
      error: 'Not Found',
      statusCode: 404,
    });
  });

  it('should format error with mandatory fields and codeAsString', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'Testlink Id not found!',
      codeAsString: 'fakeCodeAsString',
    });
    expect(error).toEqual({
      msg: 'Testlink Id not found!',
      error: 'fakeCodeAsString',
      statusCode: 404,
    });
  });

  it('should format error with mandatory fields and description', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'Testlink Id not found!',
      description: 'This error happens when there is no testlink Id created',
    });
    expect(error).toEqual({
      msg: 'Testlink Id not found!',
      error: 'Not Found',
      statusCode: 404,
      description: 'This error happens when there is no testlink Id created',
    });
  });

  it('should format error with mandatory fields and description and documentation', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'Testlink Id not found!',
      description: 'This error happens when there is no testlink Id created',
      documentation: 'https://mydocs.com/error-404',
    });
    expect(error).toEqual({
      msg: 'Testlink Id not found!',
      error: 'Not Found',
      statusCode: 404,
      description: 'This error happens when there is no testlink Id created',
      documentation: 'https://mydocs.com/error-404',
    });
  });

  it('should format message when receive a error with just a message', () => {
    const error = APIError.format({
      statusCode: 5000,
      message: 'Testlink Id not found!',
      description: undefined,
      documentation: undefined,
    });
    expect(error).toEqual({
      msg: 'Testlink Id not found!',
    });
  });

  it('should format message when receive a error with just a message', () => {
    const errorToFormat = {} as IError;
    const error = APIError.format(errorToFormat);
    expect(error).toEqual({ msg: '[object Object]' });
  });
});
