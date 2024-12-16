import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dtos/reviews.dto';

@Injectable()
export class ReviewsRepository {
  private reviews = [];

  getAllReviewsRepository() {
    return this.reviews;
  }

  getReviewByIdRepository(id: string) {
    const review = this.reviews.find((review) => review.id === id);
    return review || 'Review not found';
  }

  createReviewRepository(userId: string, review: CreateReviewDto) {
    this.reviews.push(review);
    return 'Review created';
  }

  updateReviewRepository(id: string, updatedReview: any) {
    const index = this.reviews.findIndex((review) => review.id === id);
    if (index === -1) return 'Review not found';

    this.reviews[index] = { ...this.reviews[index], ...updatedReview };
    return 'Review updated';
  }

  deleteReviewRepository(id: string) {
    const index = this.reviews.findIndex((review) => review.id === id);
    if (index === -1) return 'Review not found';

    this.reviews.splice(index, 1);
    return 'Review deleted';
  }
}