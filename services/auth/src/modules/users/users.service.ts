import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRole } from "@local-services/database";

interface CreateUserDto {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
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
        phone: data.phone,
        role: data.role,
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
