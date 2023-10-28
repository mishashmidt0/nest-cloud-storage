import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from 'src/app/entities/chat.entity';

@Module({
  controllers: [AppController],
  providers: [AppService,AppGateway],
  exports: [AppService],
  imports: [TypeOrmModule.forFeature([ChatEntity])],
})
export class AppSocketModule {}
