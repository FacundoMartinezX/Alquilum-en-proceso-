import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewService, ReviewsRepository]
})
export class ReviewsModule {}