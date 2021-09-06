export class TestlinkClientError extends Error {
  public testlinkCode: string | undefined;
  private testlinkMessage: string;

  constructor(private error: Error) {
    super(error.message);
    this.parseMessage(error.message);
    this.testlinkMessage = error.message;
  }

  private parseMessage(message: string) {
    const regexMatch = message.match(/\[\d{4}\]/)?.pop();
    const resultCode = regexMatch?.replace(/[[\]]/g, '');
    this.testlinkCode = resultCode;
  }
}
