import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ContentBlocksController } from './content-blocks.controller';
import { ContentBlocksService } from './content-blocks.service';

@Module({
  imports: [AuthModule],
  controllers: [ContentBlocksController],
  providers: [ContentBlocksService],
})
export class ContentBlocksModule {}
