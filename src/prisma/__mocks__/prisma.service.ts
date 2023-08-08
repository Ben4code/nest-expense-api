import { getUserStub } from "../../user/test/stubs/userStub";

export const PrismaService = jest.fn().mockReturnValue({
  user: {
    findUnique: jest.fn().mockResolvedValue(getUserStub())
  }
})