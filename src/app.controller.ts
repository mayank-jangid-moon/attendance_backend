import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return this.appService.getDatabaseStatus();
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Post('users')
  async createUser(@Body() userData: { email: string; name?: string }) {
    return this.appService.createUser(userData.email, userData.name);
  }
}
