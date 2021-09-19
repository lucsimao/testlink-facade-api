export interface Logger {
  info(msg: string): void;
  error(msg: Error | string): void;
  warning(msg: string): void;
}
