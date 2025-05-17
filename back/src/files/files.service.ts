import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './files.repository';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository) {}

  uploadImage(id: string, file: Express.Multer.File) {
    return this.fileUploadRepository.uploadImage(id, file);
  }
}
