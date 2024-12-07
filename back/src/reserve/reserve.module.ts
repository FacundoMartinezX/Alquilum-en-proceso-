import { Module } from '@nestjs/common';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { ReserveRepository } from './reserve.repository';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, ReserveRepository]
})
export class ReserveModule {}
