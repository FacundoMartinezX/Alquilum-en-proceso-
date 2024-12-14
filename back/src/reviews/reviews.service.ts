import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  getAllReviewsService() {
    return this.reviewsRepository.getAllReviewsRepository();
  }

  getReviewByIdService(id: string) {
    return this.reviewsRepository.getReviewByIdRepository(id);
  }

  createReviewService(review: any) {
    return this.reviewsRepository.createReviewRepository(review);
  }

  updateReviewService(id: string, review: any) {
    return this.reviewsRepository.updateReviewRepository(id, review);
  }

  deleteReviewService(id: string) {
    return this.reviewsRepository.deleteReviewRepository(id);
  }
}