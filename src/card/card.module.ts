import { Module } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { CardController } from 'src/card/card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/entities/card.entity';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([CardEntity])],
})
export class CardModule {}
