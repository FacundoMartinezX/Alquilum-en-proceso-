import { Module } from '@nestjs/common';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { ReserveRepository } from './reserve.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve, SpaceWork, User])],
  controllers: [ReserveController],
  providers: [ReserveService, ReserveRepository],
})
export class ReserveModule {}
