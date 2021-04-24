import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  login(loginDto: LoginDto) {
    const { email } = loginDto;
    const fromUser = this.usersService.getUser(email);
    return {
      loginDto,
      fromUser,
    };
  }
}