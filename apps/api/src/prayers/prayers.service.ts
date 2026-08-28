import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { EmailService } from '../notifications/email.service';
import { CreatePrayerDto } from './dto/create-prayer.dto';

@Injectable()
export class PrayersService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly email: EmailService,
  ) {}

  // Réservé à l'espace admin : liste complète, la plus récente en premier.
  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('prayers')
      .select('id, nom, prenom, message, consentement_rgpd, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de récupérer les prières.',
      );
    }

    return data;
  }

  async create(dto: CreatePrayerDto) {
    // Honeypot rempli : très probablement un bot. On répond succès sans rien
    // enregistrer, pour ne pas indiquer au bot que son envoi a été détecté.
    if (dto.siteWeb) {
      return { id: null, created_at: new Date().toISOString() };
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('prayers')
      .insert({
        nom: dto.nom,
        prenom: dto.prenom,
        message: dto.message,
        consentement_rgpd: dto.consentementRgpd,
        // visible_publiquement reste à sa valeur par défaut (false) — jamais
        // exposé publiquement en Phase 1 (cahier des charges, section 8).
      })
      .select('id, created_at')
      .single();

    if (error) {
      throw new InternalServerErrorException(
        "Impossible d'enregistrer votre prière pour le moment.",
      );
    }

    // La prière reste enregistrée même si la notification échoue.
    void this.email.sendPrayerNotification({
      nom: dto.nom,
      prenom: dto.prenom,
      message: dto.message,
    });

    return data;
  }
}
