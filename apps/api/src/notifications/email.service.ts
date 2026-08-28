import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Notification email au couple à chaque nouvelle prière (cahier des charges,
 * 7.2). Utilise l'API HTTP de Resend directement (pas de SDK, pour rester
 * léger). Tant que RESEND_API_KEY / COUPLE_NOTIFICATION_EMAIL ne sont pas
 * renseignés dans apps/api/.env, l'envoi est simplement journalisé — la
 * prière est toujours enregistrée en base, l'email n'est qu'un à-côté.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendPrayerNotification(params: {
    nom: string;
    prenom: string;
    message: string;
  }) {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    const to = this.config.get<string>('COUPLE_NOTIFICATION_EMAIL');
    const from = this.config.get<string>('NOTIFICATION_FROM_EMAIL');

    if (!apiKey || !to || !from) {
      this.logger.warn(
        `Notification email non envoyée (config Resend absente) — nouvelle prière de ${params.prenom} ${params.nom}.`,
      );
      return;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to,
          subject: `Nouvelle prière de ${params.prenom} ${params.nom}`,
          text: params.message,
        }),
      });

      if (!response.ok) {
        this.logger.error(
          `Échec de l'envoi Resend : ${response.status} ${await response.text()}`,
        );
      }
    } catch (err) {
      this.logger.error(
        "Erreur réseau lors de l'envoi de la notification email.",
        err as Error,
      );
    }
  }
}
