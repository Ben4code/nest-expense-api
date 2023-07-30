import { IsOptional } from "class-validator"

export class UpdateExpenseDto {
  @IsOptional()
  title?: string
  
  @IsOptional()
  description?: string
  
  @IsOptional()
  amount?: string
  
  @IsOptional() 
  date?: Date
}