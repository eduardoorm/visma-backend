import { Division } from '../entities/division.entity';
import { PaginationOptions } from '../../../common/interfaces/pagination.interface';

export const DIVISION_REPOSITORY = 'DIVISION_REPOSITORY';

export interface IDivisionRepository {
  findAll(where?: any, pagination?: PaginationOptions): Promise<Division[]>;
  findById(id: number): Promise<Division | null>;
  findByName(name: string): Promise<Division | null>;
  findSubdivisions(parentId: number): Promise<Division[]>;
  create(division: Division): Promise<Division>;
  update(division: Division): Promise<Division>;
  delete(id: number): Promise<void>;
  count(where?: any): Promise<number>;
}
