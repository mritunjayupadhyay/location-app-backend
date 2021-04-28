import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/security/auth.gaurd';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get('/')
  @UseGuards(new AuthGuard())
  async findAll(): Promise<any> {
    const result = await this.locationsService.findAll();
    return {
      error: false,
      data: result,
    };
  }

  @Post()
  @UseGuards(new AuthGuard())
  async create(@Body() createLocationDto: CreateLocationDto): Promise<any> {
    const { address = '', latitude, longitude } = createLocationDto;
    const result = await this.locationsService.create({
      address,
      latitude,
      longitude,
    });
    return {
      error: false,
      data: result,
    };
  }

  @Delete('/:id')
  @UseGuards(new AuthGuard())
  async delete(@Param('id') locationId) {
    const result = await this.locationsService.delete(locationId);
    return {
      error: false,
      data: result,
    };
  }
}
