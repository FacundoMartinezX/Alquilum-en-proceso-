import { Module } from '@nestjs/common';
import { SpaceWorkController } from './space-work.controller';
import { SpaceWorkService } from './space-work.service';
import { SpaceWorkRepository } from './space-work.repository';

@Module({
  controllers: [SpaceWorkController],
  providers: [SpaceWorkService, SpaceWorkRepository]
})
export class SpaceWorkModule {}
