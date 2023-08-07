import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { PaginateDto, PaginateResultDto } from 'src/common/dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async getAllUserExpense(userId: number, pagination: PaginateDto): Promise<PaginateResultDto>{
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
      },
      take: pagination.limit,
      skip: pagination.offset
    })
    const count = await this.prisma.expense.count({
      where: {
        userId,
      }
    })

    return {
      data: expenses,
      count,
      hasMore: count > pagination.limit + pagination.offset
    }
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
            firstName: true,
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
