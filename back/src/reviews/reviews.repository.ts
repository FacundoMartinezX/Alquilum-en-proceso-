import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dtos/reviews.dto';
import { Review } from './entities/reviews.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsRepository {
  
    constructor( @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(SpaceWork) private readonly spaceWorkRepository: Repository<SpaceWork>,
    @InjectRepository(User) private readonly userRepository: Repository<User>) {}
  

  async getAllReviewsRepository() {
    const reviews = await this.reviewsRepository.find();

    if (reviews.length === 0) {
          throw new NotFoundException('reviews not found');
        }

        return reviews;
  }

  getReviewByIdRepository(id: string) {
    const review = this.reviewsRepository.findOne({
      where: {id},
      relations: ['user', 'spaceWork'],
      select: {user: {userId: true}, spaceWork: {id: true}}
    });

    if(!review) new NotFoundException('review not found')

    return review;
  }

  async createReviewRepository(review: CreateReviewDto) {

    const user = await this.userRepository.findOne({ where: { userId: review.userId } });

    const spaceWork = await this.spaceWorkRepository.findOne({
      where: { id: review.spaceWorkId },
    });
    
    if (!spaceWork) {
      throw new Error('SpaceWork not found');
    }


    const newReview = this.reviewsRepository.create({
      comentario: review.comentario,
      calificacion: review.calificacion,
      user: user, 
      spaceWork: spaceWork, 
    });

    const savedReview = await this.reviewsRepository.save(newReview)

    const result = await this.reviewsRepository.findOne({
      where: {id: savedReview.id},
      relations: ['spaceWork', 'user'],
      select: {spaceWork: {id: true}, user: {userId: true}}
    })

    return result
  }

  async updateReviewRepository(userId: string, updatedReview: CreateReviewDto) {

    const {comentario, calificacion, } = updatedReview;

    const user = await this.userRepository.findOneBy({userId: userId});
    
    if(!user) new NotFoundException('user not found')

    return this.reviewsRepository.update(userId, {comentario, calificacion}) 

  }

  async deleteReviewRepository(id: string) {
    const  review = await this.reviewsRepository.findOneBy({id})

    if(!review) new NotFoundException('review not found')

    this.reviewsRepository.remove(review)

    return 'successfully removed'
  }
}