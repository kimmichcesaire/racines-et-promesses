import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { PrayersService } from './prayers.service';

@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  // Aucune route GET publique : les prières sont strictement privées
  // (cahier des charges, 7.2 et section 11) — lecture réservée à l'admin authentifié.
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.prayersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 600_000 } })
  create(@Body() dto: CreatePrayerDto) {
    return this.prayersService.create(dto);
  }
}
