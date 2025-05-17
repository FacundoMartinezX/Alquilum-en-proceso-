import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { FileUploadController } from './files.controller';
import { FileUploadRepository } from './files.repository';
import { FileUploadService } from './files.service';
import { CloudinaryProvider } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceWork])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository, CloudinaryProvider],
})
export class FilesModule {}
