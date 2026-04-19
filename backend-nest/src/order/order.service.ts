import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await (this.prisma as any).order.findMany({
      include: {
        driver: true,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto) {
    const {
      store,
      customerName,
      phone,
      address,
      time,
      status,
      notes,
      price,
      driverId,
    } = createOrderDto;

    const allowedStatuses = ['pending', 'on_the_way', 'delivered'];

    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    if (phone.length < 9) {
      throw new BadRequestException('Invalid phone number');
    }

    const driver = await (this.prisma as any).driver.findUnique({
      where: { id: Number(driverId) },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return await (this.prisma as any).order.create({
      data: {
        store,
        customerName,
        phone,
        address,
        time,
        status,
        notes: notes || '',
        price: Number(price) || 0,
        driverId: Number(driverId),
      },
      include: {
        driver: true,
      },
    });
  }

  async updateStatus(id: number, status: string) {
    const allowedStatuses = ['pending', 'on_the_way', 'delivered'];

    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const order = await (this.prisma as any).order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await (this.prisma as any).order.update({
      where: { id },
      data: { status },
      include: {
        driver: true,
      },
    });
  }

  async remove(id: number) {
    const order = await (this.prisma as any).order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await (this.prisma as any).order.delete({
      where: { id },
    });
  }
}