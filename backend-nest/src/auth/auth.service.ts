import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    const driver = await this.prisma.driver.findUnique({
      where: { phone },
    });

    if (!driver) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    if (driver.password !== password) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = {
      sub: driver.id,
      phone: driver.phone,
      type: driver.type,
      company: driver.company,
    };

    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
      driver: {
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        type: driver.type,
        company: driver.company,
      },
    };
  }
}