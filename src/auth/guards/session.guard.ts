import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserSession } from "../types";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const session = request.session as UserSession

    const isPublicRoute = this.reflector.getAllAndOverride<string>('PUBLIC_ROUTE', [
      context.getClass(),
      context.getHandler()
    ])
     
    if(isPublicRoute){
      return true
    }

    if(!session.user) throw new UnauthorizedException('Session not provided')
    return true
    
  }
}