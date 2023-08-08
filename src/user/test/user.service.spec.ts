import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { getUserStub } from './stubs/userStub';

// Enable AutoMocking
jest.mock('../../prisma/prisma.service.ts');

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        // Manual Mocking of Prisma DI
        // {
        //   provide: PrismaService,
        //   useValue: {
        //     user: {
        //       findUnique: jest.fn().mockResolvedValue(getUserStub()),
        //     },
        //   },
        // },
      ],
    }).compile();

    service = (await module).get(UserService);
    prisma = (await module).get(PrismaService);
  });

  describe('getMe()', () => {
    describe('findUnique() should be called', () => {
      let result;

      beforeEach(async () => {
        result = await service.getMe(1);
      });

      it('should bootstrap service', () => {
        expect(service).toBeDefined();
      });

      it('should return user without hash', () => {
        expect(result.id).toEqual(getUserStub().id);
        expect(result.hash).toBeUndefined();
        expect(result.hash).toBeUndefined();
      });

      it('findUnique is called', () => {
        expect(prisma.user.findUnique).toHaveReturnedWith(
          Promise.resolve(getUserStub()),
        );
      });

      it('should return user', () => {
        const user = getUserStub();
        delete user.hash;
        expect(result).toMatchObject(user);
      });
    });
  });
});
