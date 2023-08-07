import { Controller, Get, HttpCode, Session, Post, Body, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserSession } from './types';
import { PublicRoute } from './decorators';
import { Role } from '@prisma/client';

// @SetMetadata('PUBLIC_ROUTE', true)
@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() Dto: AuthDto, @Session() session: UserSession){
    const {id, email, role} = await this.authService.signUp(Dto)
    this.serializeSession(id, email, role, session)
  }

  @Post('signin')
  async signIn(@Body() Dto: AuthDto, @Session() session: UserSession){
    const {id, email, role} = await this.authService.signIn(Dto)
    this.serializeSession(id, email, role, session)
  }
  
  private serializeSession(id: number, email: string, role: Role, session: UserSession){
    session.user = {
      id,
      email,
      role
    }
  }
}
