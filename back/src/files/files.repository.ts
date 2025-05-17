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

@Injectable()
export class FileUploadRepository {
  constructor(
    @InjectRepository(SpaceWork)
    private readonly spaceWorksRepository: Repository<SpaceWork>
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const spaceWork = await this.spaceWorksRepository.findOneBy({ id });
    if (!spaceWork) {
      throw new NotFoundException(`spaceWork with id ${id} not found`);
    }

    try {
      const value: Promise<UploadApiResponse> = new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => (error ? reject(error) : resolve(result)),
        );
        toStream(file.buffer).pipe(upload); 
      });

      const uploaded = await value;

      await this.spaceWorksRepository.update(
        { id },
        {
          fotos: [...(spaceWork.fotos || []), uploaded.secure_url],
        },
      );

      return uploaded.secure_url;

    } catch (error) {
      console.error(error);
      throw new BadRequestException(`File upload error: ${error.message}`);
    }
  }
}