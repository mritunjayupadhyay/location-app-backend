import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const data = await this.authService.login(loginDto);
    return {
      error: false,
      data,
    };
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const data = await this.authService.register(registerDto);
    return {
      error: false,
      data,
    };
  }
}
