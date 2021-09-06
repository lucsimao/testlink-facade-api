export class TestlinkClientError extends Error {
  private _statusCode: number;
  constructor(error: Error, statusCode = 500) {
    super(error.message);
    this._statusCode = statusCode;
  }

  get statusCode(): number {
    return this._statusCode;
  }
}

export class TestPlanNotFoundError extends TestlinkClientError {
  constructor(error: Error) {
    super(error, 400);
  }
}

export class TestProjectNotFoundError extends TestlinkClientError {
  constructor(error: Error) {
    super(error, 400);
  }
}

export class TestlinkAuthenticationError extends TestlinkClientError {
  constructor(error: Error) {
    super(error, 401);
  }
}

export class TestSuiteNotFoundError extends TestlinkClientError {
  constructor(error: Error) {
    super(error, 400);
  }
}

export class TestlinkClientErrorFactory extends TestlinkClientError {
  private static testlinkFactory: {
    [value: string]: (error: Error) => TestlinkClientError;
  } = {
    '2000': (error: Error): TestlinkAuthenticationError =>
      new TestlinkAuthenticationError(error),
    '3000': (error: Error): TestPlanNotFoundError =>
      new TestPlanNotFoundError(error),
    '7000': (error: Error): TestProjectNotFoundError =>
      new TestProjectNotFoundError(error),
    '8000': (error: Error): TestSuiteNotFoundError =>
      new TestSuiteNotFoundError(error),
  };

  public static parseError(error: Error): Error {
    const errorCode = this.parseMessage(error.message);
    const isValidErrorCode = Object.keys(this.testlinkFactory).includes(
      errorCode
    );
    return isValidErrorCode
      ? this.testlinkFactory[errorCode](error)
      : new TestlinkClientError(error);
  }

  private static parseMessage(message: string): string {
    const regexMatch = message.match(/\[\d{4}\]/)?.pop();
    const resultCode = regexMatch?.replace(/[[\]]/g, '');
    return resultCode || '';
  }
}
