import { Module } from '@nestjs/common';

import { AppService } from './service/app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppController } from './controller/app.controller';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
