import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Req,
  Inject,
} from '@nestjs/common';
import { CreateDivisionUseCase } from '../../application/use-cases/create-division.use-case';
import {
  CreateDivisionDto,
  UpdateDivisionDto,
  DivisionResponseDto,
} from '../../application/dtos/division.dto';
import { SearchFilterAndPaginationInterceptor } from '../../../common/interceptors/search-filter-pagination.interceptor';
import {
  IDivisionRepository,
  DIVISION_REPOSITORY,
} from '../../domain/ports/division.repository';
import { RequestWithSearch } from '../../../common/interfaces/search-request.interface';
import {
  FILTERABLE_FIELDS,
  SEARCHABLE_FIELDS,
} from '../../constants/division-fields.constants';

@Controller('divisions')
@UseInterceptors(
  new SearchFilterAndPaginationInterceptor(
    SEARCHABLE_FIELDS,
    FILTERABLE_FIELDS,
  ),
)
export class DivisionController {
  constructor(
    private readonly createDivisionUseCase: CreateDivisionUseCase,
    @Inject(DIVISION_REPOSITORY)
    private readonly divisionRepository: IDivisionRepository,
  ) {}

  @Post()
  async create(
    @Body() createDivisionDto: CreateDivisionDto,
  ): Promise<DivisionResponseDto> {
    try {
      return await this.createDivisionUseCase.execute(createDivisionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(
    @Req() req: RequestWithSearch,
  ): Promise<{ data: DivisionResponseDto[]; meta: any }> {
    try {
      const divisions = await this.divisionRepository.findAll(
        req.where,
        req.pagination,
      );
      const total = await this.divisionRepository.count(req.where);

      return {
        data: divisions.map((d) => d.toJSON() as DivisionResponseDto),
        meta: {
          total,
          page: req.pagination?.page || 1,
          limit: req.pagination?.limit || 10,
          totalPages: Math.ceil(total / (req.pagination?.limit || 10)),
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/subdivisions')
  async findSubdivisions(
    @Param('id') id: string,
  ): Promise<DivisionResponseDto[]> {
    try {
      const subdivisions = await this.divisionRepository.findSubdivisions(
        Number(id),
      );
      return subdivisions.map((d) => d.toJSON() as DivisionResponseDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DivisionResponseDto> {
    try {
      const division = await this.divisionRepository.findById(Number(id));
      if (!division) {
        throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
      }
      return division.toJSON() as DivisionResponseDto;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDivisionDto: UpdateDivisionDto,
  ): Promise<DivisionResponseDto> {
    try {
      const division = await this.divisionRepository.findById(Number(id));
      if (!division) {
        throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
      }

      if (updateDivisionDto.name) division.setName(updateDivisionDto.name);
      if (updateDivisionDto.parentId !== undefined)
        division.setParentId(updateDivisionDto.parentId);
      if (updateDivisionDto.collaborators !== undefined)
        division.setCollaborators(updateDivisionDto.collaborators);
      if (updateDivisionDto.level !== undefined)
        division.setLevel(updateDivisionDto.level);
      if (updateDivisionDto.ambassadorName !== undefined)
        division.setAmbassadorName(updateDivisionDto.ambassadorName);

      const updated = await this.divisionRepository.update(division);
      return updated.toJSON() as DivisionResponseDto;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.divisionRepository.delete(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
