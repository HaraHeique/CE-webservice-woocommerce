import { Controller, Get } from '@nestjs/common';
import { Stats } from './stats.model';
import { StatsService } from './stats.service';

@Controller("/stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async listarStats(): Promise<Stats> {
    return await this.statsService.listarStats();
  }
}
