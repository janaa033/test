import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({ status: 200, description: 'Drivers list' })
  findAll() {
    return this.driverService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create driver' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({ status: 201, description: 'Driver created' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Delete(':phone')
  @ApiOperation({ summary: 'Delete driver' })
  @ApiParam({ name: 'phone', type: String })
  @ApiResponse({ status: 200, description: 'Driver deleted' })
  remove(@Param('phone') phone: string) {
    return this.driverService.remove(phone);
  }
}