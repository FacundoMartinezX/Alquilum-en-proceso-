import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewService) {}

  @Get()
  getAllReviews() {
    return this.reviewsService.getAllReviewsService();
  }

  @Get(':id')
  getReviewById(@Param('id') id: string) {
    return this.reviewsService.getReviewByIdService(id);
  }

  @Post()
  createReview(@Body() review: any) {
    return this.reviewsService.createReviewService(review);
  }

  @Put(':id')
  updateReview(@Param('id') id: string, @Body() review: any) {
    return this.reviewsService.updateReviewService(id, review);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReviewService(id);
  }
}