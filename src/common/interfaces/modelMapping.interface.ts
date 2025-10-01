export interface IModelMappingsForWhere {
  Division: {
    id: number;
    name: string;
    parentId?: number;
    collaborators: number;
    level: number;
    ambassadorName?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
