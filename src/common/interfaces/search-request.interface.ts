import { Request } from 'express';
import { PaginationOptions } from './pagination.interface';

export interface RequestWithSearch extends Request {
  where?: any;
  pagination?: PaginationOptions;
}
