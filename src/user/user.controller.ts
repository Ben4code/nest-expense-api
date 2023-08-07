import { Controller, Get, UseGuards, Session, SetMetadata } from '@nestjs/common';
import { SessionGuard } from 'src/auth/guards';
import { UserService } from './user.service';
import { GetUserId, OnlyAdmin } from 'src/auth/decorators';
import { UserSession } from 'src/auth/types';

@Controller('user')
export class UserController {
  
  constructor(private userService: UserService){}

  // @UseGuards(SessionGuard)
  // @Get('me2')
  // getMe2(@Session() session: UserSession){
  //   return this.userService.getMe(session.user.id)
  // }

  @UseGuards(SessionGuard)
  @Get('me')
  getMe(@GetUserId() userId: number){
    return this.userService.getMe(userId)
  }

  // @SetMetadata('ONLY_ADMIN', true)
  @OnlyAdmin()
  @Get('all')
  getAllUsers(){
    return this.userService.getAllUsers()
  }
}
