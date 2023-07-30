import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { GetUserId } from 'src/auth/decorators';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  async getAllUserExpense(@GetUserId() userId: number) {
    return this.expenseService.getAllUserExpense(userId);
  }

  @Get(':id')
  async getAllUserExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.getAllUserExpenseById(userId, expenseId);
  }

  @Post()
  async createExpense(
    @GetUserId() userId: number,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expenseService.createExpense(userId, dto);
  }

  @Patch(':id')
  async updateExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpenseById(userId, expenseId, dto);
  }

  @Delete(':id')
  async deleteExpenseById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.deleteExpenseById(userId, expenseId);
  }
}
