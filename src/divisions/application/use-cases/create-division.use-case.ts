import { Injectable, Inject } from '@nestjs/common';
import {
  IDivisionRepository,
  DIVISION_REPOSITORY,
} from '../../domain/ports/division.repository';
import { Division } from '../../domain/entities/division.entity';
import { CreateDivisionDto, DivisionResponseDto } from '../dtos/division.dto';

@Injectable()
export class CreateDivisionUseCase {
  constructor(
    @Inject(DIVISION_REPOSITORY)
    private readonly divisionRepository: IDivisionRepository,
  ) {}

  async execute(dto: CreateDivisionDto): Promise<DivisionResponseDto> {
    const existingDivision = await this.divisionRepository.findByName(dto.name);
    if (existingDivision) {
      throw new Error('A division with this name already exists');
    }

    if (dto.parentId) {
      const parent = await this.divisionRepository.findById(dto.parentId);
      if (!parent) {
        throw new Error('Parent division not found');
      }
    }

    const division = new Division(0, dto.name, dto.collaborators, dto.level, {
      parentId: dto.parentId,
      ambassadorName: dto.ambassadorName,
    });

    const created = await this.divisionRepository.create(division);
    return created.toJSON() as DivisionResponseDto;
  }
}
