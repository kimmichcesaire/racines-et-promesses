import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateParticipationLinkDto } from './dto/update-participation-link.dto';

@Injectable()
export class ParticipationLinksService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('participation_links')
      .select('type, valeur');

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de récupérer les liens de participation.',
      );
    }

    return data;
  }

  // Réservé à l'espace admin : mise à jour du lien Lydia, du RIB ou du numéro Wero (cahier des charges, 7.4).
  async update(
    type: 'lydia' | 'rib' | 'wero',
    dto: UpdateParticipationLinkDto,
  ) {
    const { data, error } = await this.supabase
      .getClient()
      .from('participation_links')
      .update({ valeur: dto.valeur, updated_at: new Date().toISOString() })
      .eq('type', type)
      .select('type, valeur')
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        "Impossible d'enregistrer le lien de participation.",
      );
    }
    if (!data) {
      throw new NotFoundException(
        `Lien de participation introuvable : ${type}`,
      );
    }

    return data;
  }
}
