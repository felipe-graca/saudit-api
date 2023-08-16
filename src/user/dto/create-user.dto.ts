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
import { Match } from 'src/shared/decorators/match.decorator';

export class CreateUserDto extends User {
  @IsString()
  @ApiProperty()
  name: string;

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
  @Match('password', { message: '[PASSWORD]: Passwords must match' })
  @ApiProperty()
  passwordConfirmation: string;

  @IsString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty()
  phone: string;
}
