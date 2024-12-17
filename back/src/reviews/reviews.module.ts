import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';
import { Review } from './entities/reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceWork, User, Review])],
  controllers: [ReviewsController],
  providers: [ReviewService, ReviewsRepository]
})
export class ReviewsModule {}