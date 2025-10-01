import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionsModule } from './divisions/divisions.module';

@Module({
  imports: [DivisionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
