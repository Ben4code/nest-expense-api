import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Expense } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service'


@Injectable()
export class SchedulerService {
  private logger = new Logger(SchedulerService.name)

  constructor(private prisma: PrismaService){}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async computeBalance(){
    const users = await this.prisma.user.findMany({
      include: {
        expenses: true 
      }
    })

    for(const user of users){
      const sum = user.expenses.reduce((prev, next: Expense) => {
        return prev + Number(next.amount)
      }, 0)
      
      if(user.initialBalance - sum >= user.currentBalance) continue

      await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          currentBalance: user.initialBalance - sum
        }
      }).catch(error => this.logger.error(error))
    }

    // this.logger.warn(`computeBalances ran for ${users.length} users.`);
  }
} 