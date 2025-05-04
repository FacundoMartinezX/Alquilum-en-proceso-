import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dtos/reviews.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  getAllReviewsService() {
    return this.reviewsRepository.getAllReviewsRepository();
  }

  ratingReviewsService(id:string) {
    return this.reviewsRepository.ratingReviewsRepository(id);
  }

  getReviewByIdService(id: string) {
    return this.reviewsRepository.getReviewByIdRepository(id);
  }

  createReviewService(review: CreateReviewDto) {
    return this.reviewsRepository.createReviewRepository(review);
  }

  updateReviewService(id: string, review: CreateReviewDto) {
    return this.reviewsRepository.updateReviewRepository(id, review);
  }

  deleteReviewService(id: string) {
    return this.reviewsRepository.deleteReviewRepository(id);
  }
}