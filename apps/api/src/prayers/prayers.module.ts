import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrayersController } from './prayers.controller';
import { PrayersService } from './prayers.service';

@Module({
  imports: [AuthModule],
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayersModule {}
