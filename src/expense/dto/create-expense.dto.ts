import { IsDateString, IsOptional, IsString } from "class-validator"

export class CreateExpenseDto {
  @IsString()
  title: string

  @IsOptional()
  description?: string
  
  @IsString()
  amount: string

  @IsDateString()
  date: string
}