import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async getAllUserExpense(userId: number){
    return this.prisma.expense.findMany({
      where: {
        userId,
      }
    })
  }

  async getAllUserExpenseById(userId: number, expenseId: number){
    const expense = await this.prisma.expense.findFirst({
      where: {
        id: expenseId,
      },
      include: {
        user: {
          select: {
            email: true,
            firstNmae: true,
            lastName: true
          }
        }
      }
    })

    if(!expense) throw new NotFoundException('Resource does not exist.')
    if(expense.userId !== userId) throw new ForbiddenException('Access to resource unauthorized')
    
    return expense
  }

  async createExpense(userId: number, dto: CreateExpenseDto){
    const expense = await this.prisma.expense.create({
      data: {
        userId,
        ...dto
      }
    })

    return expense
  }

  async updateExpenseById(userId: number, expenseId: number, dto: UpdateExpenseDto){
    const expense = await this.prisma.expense.findFirst({
      where: {
        id: expenseId,
      }
    })

    if(!expense) throw new NotFoundException('Resource does not exist.')
    if(expense.userId !== userId) throw new ForbiddenException('Access to resource unauthorized')
    
    const updatedExpense = await this.prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: dto
    })

    return updatedExpense
  }

  async deleteExpenseById(userId: number, expenseId: number){
    const expense = await this.prisma.expense.findFirst({
      where: {
        id: expenseId,
      }
    })

    if(!expense) throw new NotFoundException('Resource does not exist.')
    if(expense.userId !== userId) throw new ForbiddenException('Access to resource unauthorized')
    
    await this.prisma.expense.delete({
      where: {
        id: expenseId
      }
    })

    return expense
  }
}
