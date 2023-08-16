import { User } from './../../user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

import { LocalAuthGuard } from '../gaurds/local-auth.guard';
import { AuthRequest } from '../models/auth-request.model';
import { UserToken } from '../models/user-token.model';
import { ApiBody } from '@nestjs/swagger';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: '00000000000',
        },
        password: {
          type: 'string',
          example: 'admin',
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest): Promise<UserToken> {
    return await this._authService.login({ ...req.user, id: req.user.id! });
  }
}
