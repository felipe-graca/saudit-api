export class EmailError extends Error {
  constructor(message?: string) {
    super(
      message ?? '[email]: Email is not valid, please check it and try again',
    );
    this.name = 'EmailError';
  }
}
