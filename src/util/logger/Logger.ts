export interface ILoggerParams {
  msg: string;
  [key: string]: unknown;
}

export interface Logger {
  info(params: ILoggerParams): void;
  error(params: ILoggerParams): void;
  warning(params: ILoggerParams): void;
}
