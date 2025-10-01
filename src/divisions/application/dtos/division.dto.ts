export class CreateDivisionDto {
  name: string;
  parentId?: number;
  collaborators: number;
  level: number;
  ambassadorName?: string;
}

export class UpdateDivisionDto {
  name?: string;
  parentId?: number;
  collaborators?: number;
  level?: number;
  ambassadorName?: string;
}

export class DivisionResponseDto {
  id: number;
  name: string;
  parentId?: number;
  collaborators: number;
  level: number;
  ambassadorName?: string;
  createdAt: Date;
  updatedAt: Date;
}
