import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './users.schema';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  findAll(): any {
    return this.userModel.find();
  }

  async getUser(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  async createUser(userObj: RegisterDto): Promise<any> {
    const { email, name, password } = userObj;
    const newUser = new this.userModel({
      email,
      name,
      password,
    });
    const result = await newUser.save();
    return result;
  }
}
