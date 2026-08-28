import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentBlocksService } from './content-blocks.service';
import { UpdateContentBlockDto } from './dto/update-content-block.dto';

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
}
