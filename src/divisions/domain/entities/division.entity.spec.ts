import { Division } from './division.entity';

describe('Division Entity', () => {
  describe('constructor and validations', () => {
    it('should create a valid division with required parameters', () => {
      const division = new Division(1, 'Marketing', 10, 2);
      
      expect(division).toBeDefined();
      expect(division.getId()).toBe(1);
      expect(division.getName()).toBe('Marketing');
      expect(division.getCollaborators()).toBe(10);
      expect(division.getLevel()).toBe(2);
    });

    it('should create a division with optional parameters', () => {
      const division = new Division(1, 'Sales', 15, 3, {
        parentId: 5,
        ambassadorName: 'John Doe',
      });

      expect(division.getParentId()).toBe(5);
      expect(division.getAmbassadorName()).toBe('John Doe');
    });

    it('should throw error when name is empty', () => {
      expect(() => new Division(1, '', 10, 2)).toThrow(
        'Division name must not be empty and must not exceed 45 characters',
      );
    });

    it('should throw error when name exceeds 45 characters', () => {
      const longName = 'a'.repeat(46);
      expect(() => new Division(1, longName, 10, 2)).toThrow(
        'Division name must not be empty and must not exceed 45 characters',
      );
    });

    it('should throw error when collaborators is negative', () => {
      expect(() => new Division(1, 'IT', -5, 2)).toThrow(
        'Number of collaborators must be a positive integer',
      );
    });

    it('should throw error when level is negative', () => {
      expect(() => new Division(1, 'HR', 10, -1)).toThrow(
        'Level must be a positive integer',
      );
    });
  });

  describe('setters', () => {
    let division: Division;

    beforeEach(() => {
      division = new Division(1, 'Engineering', 20, 1);
    });

    it('should update name correctly', () => {
      division.setName('Technology');
      expect(division.getName()).toBe('Technology');
    });

    it('should throw error when setting invalid name', () => {
      expect(() => division.setName('')).toThrow(
        'Division name must not be empty and must not exceed 45 characters',
      );
    });

    it('should update collaborators correctly', () => {
      division.setCollaborators(25);
      expect(division.getCollaborators()).toBe(25);
    });

    it('should update level correctly', () => {
      division.setLevel(2);
      expect(division.getLevel()).toBe(2);
    });
  });

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const division = new Division(1, 'Operations', 30, 2, {
        parentId: 3,
        ambassadorName: 'Jane Smith',
      });

      const json = division.toJSON();

      expect(json).toHaveProperty('id', 1);
      expect(json).toHaveProperty('name', 'Operations');
      expect(json).toHaveProperty('collaborators', 30);
      expect(json).toHaveProperty('level', 2);
      expect(json).toHaveProperty('parentId', 3);
      expect(json).toHaveProperty('ambassadorName', 'Jane Smith');
      expect(json).toHaveProperty('createdAt');
      expect(json).toHaveProperty('updatedAt');
    });
  });
});
