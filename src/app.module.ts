import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionsModule } from './divisions/divisions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Division } from './divisions/division.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testnestdb',
      entities: [ Division ],
      synchronize: true,
    }),
    DivisionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
