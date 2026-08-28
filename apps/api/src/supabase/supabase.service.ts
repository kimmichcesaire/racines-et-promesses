import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Client Supabase unique, initialisé avec la clé service_role.
 * L'API NestJS est la seule frontière de confiance (cf. cahier des charges,
 * section 11) : le frontend ne parle jamais directement à Supabase, donc RLS
 * sert de filet de sécurité, pas de mécanisme d'accès principal.
 */
@Injectable()
export class SupabaseService implements OnModuleInit {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient | null = null;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
      this.logger.warn(
        "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY absents — le client Supabase n'est pas initialisé. Renseigner apps/api/.env (voir .env.example).",
      );
      return;
    }

    this.client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  getClient(): SupabaseClient {
    if (!this.client) {
      throw new Error(
        'Client Supabase non initialisé : vérifier SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans apps/api/.env',
      );
    }
    return this.client;
  }
}
