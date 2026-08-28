import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

/**
 * Authentification minimale à un seul mot de passe partagé, pour deux
 * utilisateurs (cahier des charges, 7.4 et 11) : pas de gestion multi-compte,
 * mais un hash bcrypt en base d'environnement plutôt qu'un mot de passe en
 * clair, et un JWT à durée de vie courte plutôt qu'une session infinie.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login(password: string): Promise<{ accessToken: string }> {
    const hash = this.config.get<string>('ADMIN_PASSWORD_HASH');

    if (!hash) {
      throw new UnauthorizedException(
        'Espace admin non configuré : ADMIN_PASSWORD_HASH absent de apps/api/.env',
      );
    }

    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    const accessToken = await this.jwt.signAsync({ sub: 'admin' });
    return { accessToken };
  }
}
