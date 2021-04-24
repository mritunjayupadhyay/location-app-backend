import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationsController } from './locations.controller';
import { locationSchema } from './locations.schema';
import { LocationsService } from './locations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Location', schema: locationSchema }]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
