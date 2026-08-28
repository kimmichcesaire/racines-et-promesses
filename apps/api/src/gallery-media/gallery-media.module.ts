import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GalleryMediaController } from './gallery-media.controller';
import { GalleryMediaService } from './gallery-media.service';

@Module({
  imports: [AuthModule],
  controllers: [GalleryMediaController],
  providers: [GalleryMediaService],
})
export class GalleryMediaModule {}
