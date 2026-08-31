import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { RsvpService } from './rsvp.service';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  // Lecture réservée à l'espace admin (jamais publique : noms + messages des invités).
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.rsvpService.findAll();
  }

  // Formulaire ouvert à tous, sans authentification (cahier des charges, 7.1).
  // Limité à 5 envois / 10 min / IP pour contenir le spam sans gêner un usage normal.
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 600_000 } })
  create(@Body() dto: CreateRsvpDto) {
    return this.rsvpService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.rsvpService.remove(id);
  }
}
