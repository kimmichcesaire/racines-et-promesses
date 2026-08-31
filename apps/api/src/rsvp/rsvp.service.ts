import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

// Aucun champ ne relie formellement une réponse RSVP à une prière : ce sont
// deux formulaires publics et indépendants (cahier des charges 7.1/7.2), sans
// identifiant partagé. Le seul rapprochement possible est le nom complet —
// normalisé (accents, casse, espaces) pour rester fiable sans devenir une
// correspondance approximative risquée sur une donnée sensible.
function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

@Injectable()
export class RsvpService {
  constructor(private readonly supabase: SupabaseService) {}

  // Réservé à l'espace admin : liste complète, la plus récente en premier.
  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('rsvp_responses')
      .select(
        'id, nom_complet, presence, nb_accompagnants, accompagnants, message, created_at',
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
        accompagnants: dto.accompagnants ?? [],
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

  // Réservé à l'espace admin : permet au couple de retirer une réponse
  // (ex. invité qui a annulé) pour garder un décompte à jour. Supprime aussi
  // la ou les prières du même nom, s'il y en a (voir normalizeName ci-dessus).
  async remove(id: string) {
    const client = this.supabase.getClient();

    const existing = await client
      .from('rsvp_responses')
      .select('id, nom_complet')
      .eq('id', id)
      .maybeSingle();

    if (existing.error) {
      throw new InternalServerErrorException(
        'Impossible de vérifier cette réponse.',
      );
    }
    if (!existing.data) {
      throw new NotFoundException('Réponse RSVP introuvable.');
    }

    const normalized = normalizeName(existing.data.nom_complet as string);

    const { data: prayers, error: prayersError } = await client
      .from('prayers')
      .select('id, nom_complet');

    if (prayersError) {
      throw new InternalServerErrorException(
        'Impossible de vérifier les prières associées.',
      );
    }

    const matchingPrayerIds = (prayers ?? [])
      .filter(
        (p: { nom_complet: string }) =>
          normalizeName(p.nom_complet) === normalized,
      )
      .map((p: { id: string }) => p.id);

    if (matchingPrayerIds.length > 0) {
      const { error: deletePrayersError } = await client
        .from('prayers')
        .delete()
        .in('id', matchingPrayerIds);

      if (deletePrayersError) {
        throw new InternalServerErrorException(
          'Impossible de supprimer les prières associées.',
        );
      }
    }

    const { error } = await client.from('rsvp_responses').delete().eq('id', id);

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de supprimer cette réponse.',
      );
    }

    return { id, prieresSupprimees: matchingPrayerIds.length };
  }
}
