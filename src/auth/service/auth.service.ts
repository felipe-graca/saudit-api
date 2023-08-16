import { PasswordError } from './../errors/password.error';
import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { EmailError } from '../errors/email.error';
import { UserPayload } from '../models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/user-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    let _user: User;
    if (this._identifyUsername(username) == AuthType.EMAIL) {
      _user = await this._userService.findByEmail(username);
    }
    if (this._identifyUsername(username) == AuthType.CPF) {
      _user = await this._userService.findByCpf(username);
    }

    if (_user) {
      if (await bcrypt.compare(password, _user.password)) {
        return {
          ..._user,
          password: undefined,
        };
      }
      throw new PasswordError();
    }
    throw new EmailError();
  }

  _identifyUsername(username: string): AuthType {
    if (username.length == 11) {
      return AuthType.CPF;
    }
    return AuthType.EMAIL;
  }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      cpf: user.cpf,
      email: user.email,
      name: user.name,
      phone: user.phone,
    };

    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}

enum AuthType {
  EMAIL = 'email',
  CPF = 'cpf',
}
