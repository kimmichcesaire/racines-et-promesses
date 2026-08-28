import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(private readonly supabase: SupabaseService) {}

  // Réservé à l'espace admin : liste complète, la plus récente en premier.
  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('rsvp_responses')
      .select(
        'id, nom_complet, presence, nb_accompagnants, message, created_at',
      )
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de récupérer les réponses RSVP.',
      );
    }

    return data;
  }

  async create(dto: CreateRsvpDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('rsvp_responses')
      .insert({
        nom_complet: dto.nomComplet,
        presence: dto.presence,
        nb_accompagnants: dto.nbAccompagnants,
        message: dto.message ?? null,
      })
      .select('id, created_at')
      .single();

    if (error) {
      throw new InternalServerErrorException(
        "Impossible d'enregistrer la réponse RSVP pour le moment.",
      );
    }

    return data;
  }
}
