import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateContentBlockDto } from './dto/update-content-block.dto';

// Même bucket que la galerie photo/vidéo, mais préfixe distinct : ces images
// (ex. tenue vestimentaire) ne doivent jamais apparaître dans la galerie
// publique du couple sur /notre-histoire, qui liste tout `gallery_media` sans
// filtre. On les stocke donc à part, sans jamais toucher cette table.
const BUCKET = 'gallery';
const IMAGE_PATH_PREFIX = 'site';

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

  // Envoie une image et l'associe directement à un bloc de contenu (ex. photo
  // de la tenue vestimentaire) — même principe que la galerie, mais sans y
  // insérer de ligne : cette image reste hors de la galerie publique.
  async uploadImage(page: string, section: string, file: Express.Multer.File) {
    const client = this.supabase.getClient();

    const existing = await client
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
    if (!existing.data.editable_par_client) {
      throw new ForbiddenException(
        "Ce contenu n'est pas éditable depuis l'espace admin (modification réservée au développeur).",
      );
    }

    const extension = extname(file.originalname) || '.jpg';
    const path = `${IMAGE_PATH_PREFIX}/${randomUUID()}${extension}`;

    const upload = await client.storage.from(BUCKET).upload(path, file.buffer, {
      contentType: file.mimetype,
    });
    if (upload.error) {
      throw new InternalServerErrorException(
        "Impossible d'envoyer le fichier.",
      );
    }

    const {
      data: { publicUrl },
    } = client.storage.from(BUCKET).getPublicUrl(path);

    const { data, error } = await client
      .from('content_blocks')
      .update({
        contenu: publicUrl,
        updated_at: new Date().toISOString(),
        updated_by: 'admin',
      })
      .eq('page', page)
      .eq('section', section)
      .select('section, contenu, date_evenement, updated_at')
      .single();

    if (error) {
      // L'image a été envoyée mais l'enregistrement en base a échoué : on
      // nettoie le bucket plutôt que de laisser un fichier orphelin.
      await client.storage.from(BUCKET).remove([path]);
      throw new InternalServerErrorException(
        "Impossible d'enregistrer l'image.",
      );
    }

    return data;
  }
}
