import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRole } from "@prisma/client";

interface CreateUserDto {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.authUser.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.authUser.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.authUser.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role as UserRole,
      },
    });
  }

  async update(id: string, data: Partial<CreateUserDto>) {
    return this.prisma.authUser.update({
      where: { id },
      data,
    });
  }
}
