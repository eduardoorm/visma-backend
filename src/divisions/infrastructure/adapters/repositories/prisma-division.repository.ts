import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IDivisionRepository } from '../../../domain/ports/division.repository';
import { Division } from '../../../domain/entities/division.entity';
import { PaginationOptions } from '../../../../common/interfaces/pagination.interface';

@Injectable()
export class PrismaDivisionRepository implements IDivisionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    where?: any,
    pagination?: PaginationOptions,
  ): Promise<Division[]> {
    const divisions = await this.prisma.division.findMany({
      where,
      skip: pagination?.skip,
      take: pagination?.limit,
      orderBy: pagination?.sortBy
        ? { [pagination.sortBy]: pagination.sortOrder || 'desc' }
        : { createdAt: 'desc' },
    });
    return divisions.map(this.toDomainEntity);
  }

  async count(where?: any): Promise<number> {
    return this.prisma.division.count({ where });
  }

  async findById(id: number): Promise<Division | null> {
    const division = await this.prisma.division.findUnique({ where: { id } });
    return division ? this.toDomainEntity(division) : null;
  }

  async findByName(name: string): Promise<Division | null> {
    const division = await this.prisma.division.findUnique({ where: { name } });
    return division ? this.toDomainEntity(division) : null;
  }

  async findSubdivisions(parentId: number): Promise<Division[]> {
    const subdivisions = await this.prisma.division.findMany({
      where: { parentId },
    });
    return subdivisions.map(this.toDomainEntity);
  }

  async create(division: Division): Promise<Division> {
    const created = await this.prisma.division.create({
      data: this.toPrismaModel(division),
    });
    return this.toDomainEntity(created);
  }

  async update(division: Division): Promise<Division> {
    const updated = await this.prisma.division.update({
      where: { id: division.getId() },
      data: this.toPrismaModel(division),
    });
    return this.toDomainEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.division.delete({ where: { id } });
  }

  private toDomainEntity(prismaModel: any): Division {
    return new Division(
      prismaModel.id,
      prismaModel.name,
      prismaModel.collaborators,
      prismaModel.level,
      {
        parentId: prismaModel.parentId,
        ambassadorName: prismaModel.ambassadorName,
        createdAt: prismaModel.createdAt,
        updatedAt: prismaModel.updatedAt,
      },
    );
  }

  private toPrismaModel(domain: Division): any {
    const json = domain.toJSON();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = json;
    return data;
  }
}
