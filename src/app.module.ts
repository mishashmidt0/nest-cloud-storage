import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PackModule } from './pack/pack.module';
import { FilesModule } from './files/files.module';
import { AppSocketModule } from './app/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { PackEntity } from 'src/pack/entities/pack.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { ChatEntity } from 'src/app/entities/chat.entity';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, FileEntity, ChatEntity, PackEntity],
      synchronize: true,
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    PackModule,
    AppSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
