import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}
  
  async getMe(userId: number){
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return {...user, hash: undefined}
  }

  async getAllUsers(){
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            expenses: true
          }
        }
      }
    })

    return users
  }
}
