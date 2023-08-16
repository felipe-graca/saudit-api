import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';
import { AuthController } from '../auth/controller/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoginValidationMiddleware } from './middlewares/login-validator.middleware';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
