export class WrappedError extends Error {
  constructor(message: string, public originalError: Error) {
    super(message);
    this.name = 'WrappedError';
  }
}
