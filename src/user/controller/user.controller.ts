import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._userService.create(createUserDto);
  }

  @Post('findByEmail')
  async findByEmail(@Body() { email }): Promise<User> {
    return this._userService.findByEmail(email);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Get(':id')
  async findOne(@Body() { id }): Promise<User> {
    return this._userService.findById(id);
  }
}
