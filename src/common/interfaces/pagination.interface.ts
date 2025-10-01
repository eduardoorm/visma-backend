export interface PaginationOptions {
  skip?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
}
