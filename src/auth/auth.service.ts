import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(Dto: AuthDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: Dto.email,
      },
    });

    if (userExists) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const hashedPassword = await hash(Dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: Dto.email,
        hash: hashedPassword,
      },
    });

    return { id: user.id, email: user.email, role: user.role };
  }

  async signIn(Dto: AuthDto) {
    const userFound = await this.prisma.user.findUnique({
      where: {
        email: Dto.email,
      },
    });

    if (!userFound) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatch = await verify(userFound.hash, Dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return { id: userFound.id, email: userFound.email, role: userFound.role };
  }
}
