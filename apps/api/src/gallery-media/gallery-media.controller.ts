import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GalleryMediaService } from './gallery-media.service';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/quicktime',
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 Mo

@Controller('gallery-media')
export class GalleryMediaController {
  constructor(private readonly service: GalleryMediaService) {}

  // Lecture publique : l'API est prête pour une galerie affichée sur le site
  // (phase ultérieure), même si aucune page publique ne l'exploite encore.
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Écriture réservée à l'espace admin authentifié.
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  create(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu.');
    }
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Format non pris en charge. Formats acceptés : JPG, PNG, WEBP, MP4, MOV.',
      );
    }
    return this.service.create(file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
