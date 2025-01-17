import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from './auth.types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login the user admin' })
  @ApiResponse({ status: HttpStatus.OK, type: Admin })
  async login(@Body() body: Admin) {
    const { email, password } = body;
    try {
      const result = await this.authService.login(email, password);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
