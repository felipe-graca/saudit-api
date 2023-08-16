export class PasswordError extends Error {
  constructor() {
    super('[password]: Password is incorrect');
    this.name = 'PasswordError';
  }
}
