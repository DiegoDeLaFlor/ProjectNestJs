import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';
import { Division } from './division.entity';
import { DivisionsRepository } from './divisions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  exports: [TypeOrmModule],
  controllers: [DivisionsController],
  providers: [DivisionsService, DivisionsRepository],
})
export class DivisionsModule {}