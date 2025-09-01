import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World! Attendance Backend is running.';
  }

  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        attendances: true,
      },
    });
  }

  async createUser(email: string, name?: string) {
    return this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async getDatabaseStatus() {
    try {
      const userCount = await this.prisma.user.count();
      const attendanceCount = await this.prisma.attendance.count();
      return {
        status: 'connected',
        userCount,
        attendanceCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
