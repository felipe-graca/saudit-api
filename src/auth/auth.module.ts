import { Module } from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';
import { AuthController } from '../auth/controller/auth.controller';
import { LocalStratrgy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStratrgy, JwtStrategy],
})
export class AuthModule {}
