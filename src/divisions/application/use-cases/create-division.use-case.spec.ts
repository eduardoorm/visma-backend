import { Test, TestingModule } from '@nestjs/testing';
import { CreateDivisionUseCase } from './create-division.use-case';
import { DIVISION_REPOSITORY } from '../../domain/ports/division.repository';
import { Division } from '../../domain/entities/division.entity';
import { CreateDivisionDto } from '../dtos/division.dto';

describe('CreateDivisionUseCase', () => {
  let useCase: CreateDivisionUseCase;
  let mockRepository: any;

  beforeEach(async () => {
    // Mock del repositorio
    mockRepository = {
      create: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDivisionUseCase,
        {
          provide: DIVISION_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateDivisionUseCase>(CreateDivisionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a new division successfully', async () => {
      const createDto: CreateDivisionDto = {
        name: 'Engineering',
        collaborators: 25,
        level: 1,
      };

      const mockDivision = new Division(1, 'Engineering', 25, 1);
      mockRepository.create.mockResolvedValue(mockDivision);

      const result = await useCase.execute(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Engineering',
          collaborators: 25,
          level: 1,
        }),
      );
      expect(result).toEqual(mockDivision.toJSON());
    });

    it('should create a division with optional parameters', async () => {
      const createDto: CreateDivisionDto = {
        name: 'Sales',
        collaborators: 15,
        level: 2,
        parentId: 1,
        ambassadorName: 'John Doe',
      };

      const mockParent = new Division(1, 'Parent Division', 20, 1);
      const mockDivision = new Division(2, 'Sales', 15, 2, {
        parentId: 1,
        ambassadorName: 'John Doe',
      });
      
      mockRepository.findById.mockResolvedValue(mockParent);
      mockRepository.create.mockResolvedValue(mockDivision);

      const result = await useCase.execute(createDto);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Sales',
          collaborators: 15,
          level: 2,
          parentId: 1,
          ambassadorName: 'John Doe',
        }),
      );
      expect(result).toEqual(mockDivision.toJSON());
    });

    it('should throw error when division entity validation fails', async () => {
      const createDto: CreateDivisionDto = {
        name: '', // Nombre inválido
        collaborators: 10,
        level: 1,
      };

      await expect(useCase.execute(createDto)).rejects.toThrow(
        'Division name must not be empty and must not exceed 45 characters',
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error when collaborators is negative', async () => {
      const createDto: CreateDivisionDto = {
        name: 'Marketing',
        collaborators: -5,
        level: 1,
      };

      await expect(useCase.execute(createDto)).rejects.toThrow(
        'Number of collaborators must be a positive integer',
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should handle repository errors', async () => {
      const createDto: CreateDivisionDto = {
        name: 'Finance',
        collaborators: 20,
        level: 1,
      };

      mockRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(useCase.execute(createDto)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
