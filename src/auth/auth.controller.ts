import { Controller, Get, HttpCode, Session, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Request } from 'express';
import { UserSession } from './types';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() Dto: AuthDto, @Session() session: UserSession){
    const {id, email} = await this.authService.signUp(Dto)
    this.serializeSession(id, email, session)
  }

  @Post('signin')
  async signIn(@Body() Dto: AuthDto, @Session() session: UserSession){
    const {id, email} = await this.authService.signIn(Dto)
    this.serializeSession(id, email, session)
  }
  
  private serializeSession(id: number, email: string, session: UserSession){
    session.user = {
      id,
      email
    }
    console.log(session)
  }
}
