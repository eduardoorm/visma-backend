import { Module } from '@nestjs/common';
import { DivisionController } from './infrastructure/controllers/division.controller';
import { CreateDivisionUseCase } from './application/use-cases/create-division.use-case';
import { PrismaDivisionRepository } from './infrastructure/adapters/repositories/prisma-division.repository';
import { DIVISION_REPOSITORY } from './domain/ports/division.repository';

@Module({
  controllers: [DivisionController],
  providers: [
    CreateDivisionUseCase,
    {
      provide: DIVISION_REPOSITORY,
      useClass: PrismaDivisionRepository,
    },
  ],
})
export class DivisionsModule {}
