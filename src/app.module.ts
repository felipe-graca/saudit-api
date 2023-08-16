import { Module } from '@nestjs/common';

import { AppService } from './service/app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppController } from './controller/app.controller';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/gaurds/jwt-auth.guard';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
