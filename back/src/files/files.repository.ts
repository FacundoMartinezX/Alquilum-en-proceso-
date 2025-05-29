import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';
import * as toStream from 'buffer-to-stream'; 
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { isUUID } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FileUploadRepository {
  constructor(
    @InjectRepository(SpaceWork)
    private readonly spaceWorksRepository: Repository<SpaceWork>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async uploadImage(id: string, files: Express.Multer.File[]) {
    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });

    const spaceWork = await this.spaceWorksRepository.findOneBy({ id });
    if (!spaceWork) {
      throw new NotFoundException(`spaceWork with id ${id} not found`);
    }

    try {

      const uploadedUrls: string[] = []

      for (const file of files) {

         const value: Promise<UploadApiResponse> = new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => (error ? reject(error) : resolve(result)),
        );
        toStream(file.buffer).pipe(upload); 
      });

      uploadedUrls.push((await value).secure_url)

      await this.spaceWorksRepository.update(
        { id },
        {
          fotos: [...(spaceWork.fotos || []), ...uploadedUrls],
        },
      );

      
    }
    return {url: uploadedUrls};

     

    } catch (error) {
      console.error(error);
      throw new BadRequestException(`File upload error: ${error.message}`);
    }
  }

   async uploadImageProfileRepository(userId: string, file: Express.Multer.File) {

    if(!isUUID) {
      throw new BadRequestException('user_id is not UUID')
    }

    const user = await this.userRepository.findOneBy({userId})

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const value: Promise<UploadApiResponse> = new Promise(
      (resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream({resource_type: 'auto'}, 
          (error, result) => (error ? reject(error) : resolve(result))
        )
        toStream(file.buffer).pipe(upload)
      }
    )

    user.user_img = (await value).secure_url;
    await this.userRepository.save(user)

    return {message: 'image upload successfully'}
    
  }
}