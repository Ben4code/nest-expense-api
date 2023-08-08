import { Role } from "@prisma/client";

const date = new Date()
export const getUserStub = () => ({
  id: 1,
  email: 'email@example.com',
  firstName: 'John',
  lastname: 'Doe',
  hash: '12345',
  currentBalance: 2000,
  initialBalance: 2000,
  role: Role.USER,
  createdAt: date,
  updatedAt: date
})