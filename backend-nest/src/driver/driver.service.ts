import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.driver.findMany();
  }

  async create(createDriverDto: CreateDriverDto) {
    const { phone } = createDriverDto;

    const existing = await this.prisma.driver.findUnique({
      where: { phone },
    });

    if (existing) {
      throw new BadRequestException('Driver already exists');
    }

    return await this.prisma.driver.create({
      data: createDriverDto,
    });
  }

  async remove(phone: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { phone },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return await this.prisma.driver.delete({
      where: { phone },
    });
  }
}