import { Controller, Get, UseGuards, Session } from '@nestjs/common';
import { SessionGuard } from 'src/auth/guards';
import { UserService } from './user.service';
import { GetUserId } from 'src/auth/decorators';

@Controller('user')
export class UserController {
  
  constructor(private userService: UserService){}

  @UseGuards(SessionGuard)
  @Get('me')
  // getMe(@Session() session: UserSession){
  //   return this.userService.getMe(session.user.id)
  // }
  getMe(@GetUserId() userId: number){
    return this.userService.getMe(userId)
  }
}
