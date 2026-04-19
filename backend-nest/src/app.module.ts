import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, DriverModule, OrderModule, AuthModule],
})
export class AppModule {}