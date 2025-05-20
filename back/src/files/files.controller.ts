import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
  
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {

    const MAX_SIZE = 2 * 1024 * 1024;
    const allowedTypes = /jpg|jpeg|webp|gif|png|svg/;

    for(const file of files) {
      if(file.size > MAX_SIZE) {
        throw new BadRequestException(`El archivo ${file.originalname} excede el tamaño máximo de 2MB.`);
      }

      if (!allowedTypes.test(file.mimetype)) {
      throw new BadRequestException(`Tipo de archivo no permitido: ${file.originalname}`);
    }
    }
   

  return this.fileUploadService.uploadImage(id, files);

  }
}