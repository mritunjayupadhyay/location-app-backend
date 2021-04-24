import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  findAll(): any {
    return this.userModel.find();
  }

  async getUser(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }
}
