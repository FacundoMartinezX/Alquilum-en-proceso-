  import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
  import { ReviewService } from './reviews.service';
  import { CreateReviewDto } from './dtos/reviews.dto';

  @Controller('reviews')
  export class ReviewsController {
    constructor(private readonly reviewsService: ReviewService) {}

    @Get()
    getAllReviewsController() {
      return this.reviewsService.getAllReviewsService();
    }
    
    @Get(':id')
    getReviewByIdController(@Param('id') id: string) {  
      return this.reviewsService.getReviewByIdService(id);
    }
    
    @Get("/rating/:id")
    ratingReviewsController(@Param('id') id: string) {
      return this.reviewsService.ratingReviewsService(id);
    }

    @Post()
    createReviewController(@Body() review: CreateReviewDto) {
      return this.reviewsService.createReviewService(review);
    }

    @Put(':id')
    updateReviewController(@Param('id') id: string, @Body() review: CreateReviewDto) {
      return this.reviewsService.updateReviewService(id, review);
    }

    @Delete(':id')
    deleteReviewController(@Param('id') id: string) {
      return this.reviewsService.deleteReviewService(id);
    }
  }