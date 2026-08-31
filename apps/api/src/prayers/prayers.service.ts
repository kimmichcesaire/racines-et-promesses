import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      .select('id, nom_complet, message, consentement_rgpd, created_at')
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
        nom_complet: dto.nomComplet,
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
      nomComplet: dto.nomComplet,
      message: dto.message,
    });

    return data;
  }

  // Réservé à l'espace admin : permet au couple de retirer une prière lue.
  async remove(id: string) {
    const client = this.supabase.getClient();

    const existing = await client
      .from('prayers')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (existing.error) {
      throw new InternalServerErrorException(
        'Impossible de vérifier cette prière.',
      );
    }
    if (!existing.data) {
      throw new NotFoundException('Prière introuvable.');
    }

    const { error } = await client.from('prayers').delete().eq('id', id);

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de supprimer cette prière.',
      );
    }

    return { id };
  }
}
