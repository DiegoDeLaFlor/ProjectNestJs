import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionsModule } from './divisions/divisions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Division } from './divisions/division.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_DBPORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [ Division ],
      synchronize: true,
    }),
    
    DivisionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
