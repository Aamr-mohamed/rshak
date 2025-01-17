import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin() {
    const adminExists = await this.prisma.admin.findFirst();
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const admin = await this.prisma.admin.create({
        data: {
          email: 'admin@admin.com',
          password: hashedPassword,
          token: 'admin',
        },
      });
      return admin;
    }
    return adminExists;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = await bcrypt.hash(user.token, 10);
    user.token = token;

    if (!isPasswordValid) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
    return user;
  }
}
