export class User {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  isNewUser: boolean;
  isSocialMedia: boolean;
  lastSession: Date;
  createdAt: Date;
}
