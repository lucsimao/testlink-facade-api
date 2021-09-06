import { APIError, IError } from '../../api-error';

describe('APIError', () => {
  it('should format error with mandatory fields', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'User not found!',
    });
    expect(error).toEqual({
      message: 'User not found!',
      error: 'Not Found',
      statusCode: 404,
    });
  });
  it('should format error with mandatory fields and description', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'User not found!',
      description: 'This error happens when there is no user created',
    });
    expect(error).toEqual({
      message: 'User not found!',
      error: 'Not Found',
      statusCode: 404,
      description: 'This error happens when there is no user created',
    });
  });
  it('should format error with mandatory fields and description and documentation', () => {
    const error = APIError.format({
      statusCode: 404,
      message: 'User not found!',
      description: 'This error happens when there is no user created',
      documentation: 'https://mydocs.com/error-404',
    });
    expect(error).toEqual({
      message: 'User not found!',
      error: 'Not Found',
      statusCode: 404,
      description: 'This error happens when there is no user created',
      documentation: 'https://mydocs.com/error-404',
    });
  });

  it('should format message when receive a error with just a message', () => {
    const error = APIError.format({
      statusCode: 5000,
      message: 'User not found!',
      description: undefined,
      documentation: undefined,
    });
    expect(error).toEqual({
      error: 'User not found!',
    });
  });

  it('should format message when receive a error with just a message', () => {
    const errorToFormat = {} as IError;
    const error = APIError.format(errorToFormat);
    expect(error).toEqual({ error: '[object Object]' });
  });
});
