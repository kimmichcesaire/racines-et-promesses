import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateParticipationLinkDto } from './dto/update-participation-link.dto';
import { ParticipationLinksService } from './participation-links.service';

@Controller('participation-links')
export class ParticipationLinksController {
  constructor(private readonly service: ParticipationLinksService) {}

  // Lecture publique : lien Lydia + RIB affichés sur le site (cahier des charges, 7.3).
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Écriture réservée à l'espace admin authentifié (cahier des charges, 7.4).
  @Patch(':type')
  @UseGuards(JwtAuthGuard)
  update(@Param('type') type: string, @Body() dto: UpdateParticipationLinkDto) {
    if (type !== 'lydia' && type !== 'rib') {
      throw new BadRequestException(
        "Type de lien invalide : attendu 'lydia' ou 'rib'.",
      );
    }
    return this.service.update(type, dto);
  }
}
