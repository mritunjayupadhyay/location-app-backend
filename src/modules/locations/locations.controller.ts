import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/security/auth.gaurd';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  @UseGuards(new AuthGuard())
  findAll(): any {
    return this.locationsService.findAll();
  }
}
