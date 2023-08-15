import { PrismaService } from './../../prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const data = {
      ...createUserDto,
      password: encryptedPassword,
      isNewUser: true,
      isSocialMedia: false,
      createdAt: new Date(),
      lastSession: new Date(),
    };

    const _user = this._prisma.user.create({ data });

    return { ..._user, password: undefined, passwordConfirmation: undefined };
  }
}
