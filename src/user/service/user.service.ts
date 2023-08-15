import { PrismaService } from './../../prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
