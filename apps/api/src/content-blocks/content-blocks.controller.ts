import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentBlocksService } from './content-blocks.service';
import { UpdateContentBlockDto } from './dto/update-content-block.dto';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 Mo

@Controller('content-blocks')
export class ContentBlocksController {
  constructor(private readonly service: ContentBlocksService) {}

  // Lecture publique : c'est ce qui alimente les textes du site (cahier des charges, section 8).
  @Get()
  findByPage(@Query('page') page: string) {
    return this.service.findByPage(page);
  }

  // Écriture réservée à l'espace admin authentifié.
  @Patch(':page/:section')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('page') page: string,
    @Param('section') section: string,
    @Body() dto: UpdateContentBlockDto,
  ) {
    return this.service.update(page, section, dto, 'admin');
  }

  // Envoi d'image réservé à l'espace admin authentifié (ex. photo de la
  // tenue vestimentaire) — distinct de la galerie /gallery-media.
  @Post(':page/:section/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_IMAGE_SIZE } }),
  )
  uploadImage(
    @Param('page') page: string,
    @Param('section') section: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu.');
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        'Format non pris en charge. Formats acceptés : JPG, PNG, WEBP.',
      );
    }
    return this.service.uploadImage(page, section, file);
  }
}
