import {
  Equals,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends User {
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  cpf: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Equals('password', { message: '[PASSWORD]: Passwords must match' })
  @ApiProperty()
  passwordConfirmation: string;

  @IsString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty()
  phone: string;
}
