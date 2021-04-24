import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    const { email } = loginDto;
    const user = await this.usersService.getUser(email);
    if (!user) {
      throw new HttpException('Access Denied', HttpStatus.BAD_REQUEST);
    }
    const { password } = user;
    const validPassword = bcrypt.compare(loginDto.password, password);
    if (!validPassword) {
      throw new HttpException('Access Denied', HttpStatus.BAD_REQUEST);
    }
    return {
      loginDto,
      error: false,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    const user = await this.usersService.getUser(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(password);
    const fromUser = await this.usersService.createUser({
      email,
      password: hashedPassword,
      name,
    });
    return {
      registerDto,
      fromUser,
    };
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
