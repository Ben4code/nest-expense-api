import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserSession } from "../types";
import { Observable } from "rxjs";

export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const session = request.session as UserSession

    if(!session.user) throw new UnauthorizedException('Session not provided')
    return true
    
  }
}