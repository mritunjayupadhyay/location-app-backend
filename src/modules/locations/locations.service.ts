import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { ILocation } from './locations.schema';
@Injectable({ scope: Scope.REQUEST })
export class LocationsService {
  constructor(
    @Inject(REQUEST) private readonly request,
    @InjectModel('Location') private locationModel: Model<ILocation>,
  ) {}

  findAll() {
    return this.locationModel.find();
  }

  async getOne(id) {
    return this.locationModel.findOne({ _id: id });
  }

  async create(createLocationDto: CreateLocationDto) {
    const { user = {} } = this.request;
    const { userId } = user;
    const { address = '', latitude, longitude } = createLocationDto;
    const newLocation = new this.locationModel({
      address,
      latitude,
      longitude,
      userId,
    });
    const result = await newLocation.save();
    return result;
  }

  async delete(locationId: string) {
    const { user = {} } = this.request;
    const { userId } = user;
    const location = await this.getOne(locationId);
    if (!location) {
      throw new HttpException(
        'Location does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userId !== location.userId) {
      throw new HttpException(
        'This location does not belongs to you',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.locationModel.deleteOne({ _id: locationId });
  }
}
