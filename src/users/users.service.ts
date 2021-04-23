import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(): { error: boolean; data: string } {
    return {
      error: false,
      data: 'Found',
    };
  }
}
