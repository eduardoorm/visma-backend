export class Division {
  private readonly id: number;
  private name: string;
  private parentId?: number;
  private collaborators: number;
  private level: number;
  private ambassadorName?: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    name: string,
    collaborators: number,
    level: number,
    params?: {
      parentId?: number;
      ambassadorName?: string;
      createdAt?: Date;
      updatedAt?: Date;
    },
  ) {
    this.validateName(name);
    this.validateCollaborators(collaborators);
    this.validateLevel(level);

    this.id = id;
    this.name = name;
    this.collaborators = collaborators;
    this.level = level;
    this.parentId = params?.parentId;
    this.ambassadorName = params?.ambassadorName;
    this.createdAt = params?.createdAt || new Date();
    this.updatedAt = params?.updatedAt || new Date();
  }

  private validateName(name: string): void {
    if (!name || name.length > 45) {
      throw new Error(
        'Division name must not be empty and must not exceed 45 characters',
      );
    }
  }

  private validateCollaborators(collaborators: number): void {
    if (collaborators < 0 || !Number.isInteger(collaborators)) {
      throw new Error('Number of collaborators must be a positive integer');
    }
  }

  private validateLevel(level: number): void {
    if (level < 1 || !Number.isInteger(level)) {
      throw new Error('Level must be a positive integer');
    }
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getParentId(): number | undefined {
    return this.parentId;
  }

  getCollaborators(): number {
    return this.collaborators;
  }

  getLevel(): number {
    return this.level;
  }

  getAmbassadorName(): string | undefined {
    return this.ambassadorName;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setName(name: string): void {
    this.validateName(name);
    this.name = name;
    this.updatedAt = new Date();
  }

  setParentId(parentId?: number): void {
    this.parentId = parentId;
    this.updatedAt = new Date();
  }

  setCollaborators(collaborators: number): void {
    this.validateCollaborators(collaborators);
    this.collaborators = collaborators;
    this.updatedAt = new Date();
  }

  setLevel(level: number): void {
    this.validateLevel(level);
    this.level = level;
    this.updatedAt = new Date();
  }

  setAmbassadorName(ambassadorName?: string): void {
    this.ambassadorName = ambassadorName;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      parentId: this.parentId,
      collaborators: this.collaborators,
      level: this.level,
      ambassadorName: this.ambassadorName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
