import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { RsvpModule } from './rsvp/rsvp.module';
import { PrayersModule } from './prayers/prayers.module';
import { ParticipationLinksModule } from './participation-links/participation-links.module';
import { GalleryMediaModule } from './gallery-media/gallery-media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Filet de sécurité global (300 req / 15 min / IP) ; les routes de
    // formulaires publics ont en plus leur propre limite plus stricte
    // via @Throttle (cahier des charges, section 11).
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 900_000, limit: 300 }],
      // Message par défaut de la librairie : "ThrottlerException: Too Many
      // Requests" — remplacé par un message en français, compréhensible par
      // un invité qui tomberait sur cette limite (cas rare mais possible).
      errorMessage: (_context, detail) => {
        const minutes = Math.ceil(detail.ttl / 60_000);
        return `Trop de tentatives en peu de temps. Merci de patienter ${minutes} minute${minutes > 1 ? 's' : ''} avant de réessayer.`;
      },
    }),
    SupabaseModule,
    NotificationsModule,
    AuthModule,
    ContentBlocksModule,
    RsvpModule,
    PrayersModule,
    ParticipationLinksModule,
    GalleryMediaModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
