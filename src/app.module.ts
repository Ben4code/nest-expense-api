import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.moduel';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './auth/guards';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_GUARD,
      useClass: SessionGuard
    }
  ],
})
export class AppModule {}
