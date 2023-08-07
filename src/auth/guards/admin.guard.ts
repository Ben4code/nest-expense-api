import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserSession } from "../types";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const session = request.session as UserSession

    const isAdminRoute = this.reflector.getAllAndOverride<string>('ONLY_ADMIN', [
      context.getClass(),
      context.getHandler()
    ]);
     
    if(!isAdminRoute){
      return true
    }

    if(session.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Reserved for admin.')
    }

    return true
  }
}