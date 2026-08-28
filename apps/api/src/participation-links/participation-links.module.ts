import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ParticipationLinksController } from './participation-links.controller';
import { ParticipationLinksService } from './participation-links.service';

@Module({
  imports: [AuthModule],
  controllers: [ParticipationLinksController],
  providers: [ParticipationLinksService],
})
export class ParticipationLinksModule {}
