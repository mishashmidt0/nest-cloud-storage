import { Module } from '@nestjs/common';
import { PackService } from 'src/pack/pack.service';
import { PackController } from 'src/pack/pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackEntity } from 'src/pack/entities/pack.entity';

@Module({
  controllers: [PackController],
  providers: [PackService],
  imports: [TypeOrmModule.forFeature([PackEntity])],
})
export class PackModule {}
