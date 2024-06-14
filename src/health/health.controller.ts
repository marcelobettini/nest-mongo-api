import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return HttpStatus.OK;
  }
}
