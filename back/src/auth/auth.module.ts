import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule implements OnApplicationBootstrap {
  constructor(private readonly authService: AuthService) {}
  async onApplicationBootstrap() {
    await this.authService.createAdmin();
  }
}
