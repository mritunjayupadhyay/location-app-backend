import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { jwtPrivateKey } from '../../config';
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
    const token = await this.generateJwtToken(user._id);
    return {
      user,
      authToken: token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    const user = await this.usersService.getUser(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(password);
    const createdUser = await this.usersService.createUser({
      email,
      password: hashedPassword,
      name,
    });
    const token = await this.generateJwtToken(createdUser._id);
    return {
      user: createdUser,
      authToken: token,
    };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async generateJwtToken(userId: string) {
    return jwt.sign({ userId }, jwtPrivateKey, { expiresIn: '10h' });
  }
}
