import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SimpleService } from './simple.service';

@Module({
  controllers: [UserController],
  providers: [UserService, SimpleService]
})
export class UserModule {}
