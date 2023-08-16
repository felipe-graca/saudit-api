import { PrismaService } from './../../prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const data = {
      ...createUserDto,
      password: encryptedPassword,
      passwordConfirmation: undefined,
      isSocialMedia: false,
      createdAt: new Date().toISOString(),
      lastSession: new Date().toISOString(),
    };

    const _user = this._prisma.user.create({ data });

    return {
      ..._user,
      password: undefined,
      isSocialMedia: true,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return await this._prisma.user.findUnique({ where: { email } });
  }

  async findByCpf(cpf: string): Promise<User> {
    return await this._prisma.user.findUnique({ where: { cpf } });
  }

  async findById(id: number): Promise<User> {
    return await this._prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this._prisma.user.findMany();
  }
}
