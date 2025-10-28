
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayloadModule } from '../payload/payload.module';

@Module({
  imports: [PayloadModule.forRootAsync()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
