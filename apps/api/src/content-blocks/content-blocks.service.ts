import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateContentBlockDto } from './dto/update-content-block.dto';

@Injectable()
export class ContentBlocksService {
  constructor(private readonly supabase: SupabaseService) {}

  async findByPage(page: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('content_blocks')
      .select(
        'section, contenu, editable_par_client, date_evenement, updated_at',
      )
      .eq('page', page);

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de récupérer le contenu.',
      );
    }

    return data;
  }

  async update(
    page: string,
    section: string,
    dto: UpdateContentBlockDto,
    updatedBy: string,
  ) {
    const existing = await this.supabase
      .getClient()
      .from('content_blocks')
      .select('editable_par_client')
      .eq('page', page)
      .eq('section', section)
      .maybeSingle();

    if (existing.error) {
      throw new InternalServerErrorException(
        'Impossible de vérifier ce contenu.',
      );
    }
    if (!existing.data) {
      throw new NotFoundException(
        `Bloc de contenu introuvable : ${page}/${section}`,
      );
    }

    // Défense en profondeur : même un token admin valide ne doit pas pouvoir
    // modifier un bloc marqué comme réservé au développeur (structure, code).
    if (!existing.data.editable_par_client) {
      throw new ForbiddenException(
        "Ce contenu n'est pas éditable depuis l'espace admin (modification réservée au développeur).",
      );
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('content_blocks')
      .update({
        contenu: dto.contenu,
        date_evenement: dto.dateEvenement ?? null,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      })
      .eq('page', page)
      .eq('section', section)
      .select('section, contenu, date_evenement, updated_at')
      .single();

    if (error) {
      throw new InternalServerErrorException(
        "Impossible d'enregistrer la modification.",
      );
    }

    return data;
  }
}
