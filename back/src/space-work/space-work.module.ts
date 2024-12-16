import { Module } from '@nestjs/common';
import { SpaceWorkController } from './space-work.controller';
import { SpaceWorkService } from './space-work.service';
import { SpaceWorkRepository } from './space-work.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceWork } from './entities/spaceWork.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceWork])],
  controllers: [SpaceWorkController],
  providers: [SpaceWorkService, SpaceWorkRepository]
})
export class SpaceWorkModule {}
