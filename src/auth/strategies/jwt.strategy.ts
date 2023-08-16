import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayload } from '../models/user-payload.model';
import { UserFromJwt } from '../models/user-from-jwt.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payLoad: UserPayload): Promise<UserFromJwt> {
    return {
      id: payLoad.sub,
      email: payLoad.email,
      name: payLoad.name,
      cpf: payLoad.cpf,
      phone: payLoad.phone,
    };
  }
}
