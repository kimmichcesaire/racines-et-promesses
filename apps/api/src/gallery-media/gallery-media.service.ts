import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { SupabaseService } from '../supabase/supabase.service';

const BUCKET = 'gallery';

@Injectable()
export class GalleryMediaService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('gallery_media')
      .select('id, url, type, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(
        'Impossible de récupérer la galerie.',
      );
    }

    return data;
  }

  async create(file: Express.Multer.File) {
    const client = this.supabase.getClient();
    const type: 'photo' | 'video' = file.mimetype.startsWith('video/')
      ? 'video'
      : 'photo';
    const extension =
      extname(file.originalname) || (type === 'video' ? '.mp4' : '.jpg');
    const path = `${type}/${randomUUID()}${extension}`;

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
      .from('gallery_media')
      .insert({ url: publicUrl, type, storage_path: path })
      .select('id, url, type, created_at')
      .single();

    if (error) {
      // Le fichier a été envoyé mais l'insertion en base a échoué : on
      // nettoie le bucket plutôt que de laisser un fichier orphelin.
      await client.storage.from(BUCKET).remove([path]);
      throw new InternalServerErrorException(
        "Impossible d'enregistrer le média.",
      );
    }

    return data;
  }

  async remove(id: string) {
    const client = this.supabase.getClient();

    const existing = await client
      .from('gallery_media')
      .select('storage_path')
      .eq('id', id)
      .maybeSingle();

    if (existing.error) {
      throw new InternalServerErrorException(
        'Impossible de vérifier ce média.',
      );
    }
    if (!existing.data) {
      throw new NotFoundException('Média introuvable.');
    }

    await client.storage
      .from(BUCKET)
      .remove([existing.data.storage_path as string]);

    const { error } = await client.from('gallery_media').delete().eq('id', id);
    if (error) {
      throw new InternalServerErrorException(
        'Impossible de supprimer le média.',
      );
    }

    return { id };
  }
}
