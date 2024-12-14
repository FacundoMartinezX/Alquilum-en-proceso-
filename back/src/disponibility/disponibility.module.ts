import { Module } from '@nestjs/common';
import { DisponibilityController } from './disponibility.controller';
import { DisponibilityService } from './disponibility.service';

@Module({
  controllers: [DisponibilityController],
  providers: [DisponibilityService]
})
export class DisponibilityModule {}
