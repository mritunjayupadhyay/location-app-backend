import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor() {}

  findAll(): any {
    return 'Found all locations';
  }
}
