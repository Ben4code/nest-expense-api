import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { GetUserId } from 'src/auth/decorators';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { PaginateDto } from 'src/common/dto';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  async getAllUserExpense(@GetUserId() userId: number, @Query() pagination: PaginateDto ) {
    return this.expenseService.getAllUserExpense(userId, pagination);
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
