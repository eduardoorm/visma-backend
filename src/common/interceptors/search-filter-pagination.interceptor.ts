import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {
  booleanFields,
  dateFields,
  numberFields,
} from '../constants/common.constants';
import { IModelMappingsForWhere } from '../interfaces/modelMapping.interface';
import { PaginationOptions } from '../interfaces/pagination.interface';
import * as qs from 'qs';
import { pick } from '../utils/pick.utils';

@Injectable()
export class SearchFilterAndPaginationInterceptor<
  T extends keyof IModelMappingsForWhere,
> implements NestInterceptor
{
  constructor(
    private readonly searchableFields: Array<keyof IModelMappingsForWhere[T]>,
    private readonly filterableFields: Array<keyof IModelMappingsForWhere[T]>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const originalUrl = request.url;
    const queryStr = originalUrl.split('?')[1] ?? '';
    const parsedQuery = qs.parse(queryStr);

    const {
      searchTerm,
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
      ...filterQuery
    } = parsedQuery;

    const filterFields = pick(filterQuery, this.filterableFields.map(String));

    const where: any = {};

    // Lógica de búsqueda por término
    if (typeof searchTerm === 'string') {
      where.OR = this.searchableFields
        .map((field) => {
          if (typeof field === 'string') {
            if (numberFields.includes(field)) {
              if (!isNaN(Number(searchTerm))) {
                return { [field]: { equals: Number(searchTerm) } };
              }
            } else if (dateFields.includes(field)) {
              const date = new Date(searchTerm);
              if (!isNaN(date.getTime())) {
                return { [field]: { equals: date } };
              }
            } else {
              return { [field]: { contains: searchTerm } };
            }
          }
          return {};
        })
        .filter((item) => Object.keys(item).length > 0);
    }

    // Lógica de filtros
    const filters: any[] = Object.entries(filterFields).map(([key, value]) => {
      if (numberFields.includes(key)) {
        if (typeof value === 'object') {
          return {
            [key]: Object.fromEntries(
              Object.entries(value as object).map(([k, v]) => [k, Number(v)]),
            ),
          };
        }
        return { [key]: { equals: Number(value) } };
      }

      if (dateFields.includes(key)) {
        if (typeof value === 'object') {
          return {
            [key]: Object.fromEntries(
              Object.entries(value as object).map(([k, v]) => [
                k,
                new Date(v as string),
              ]),
            ),
          };
        }
        return { [key]: { equals: new Date(value as string) } };
      }

      if (booleanFields.includes(key)) {
        return { [key]: value === 'true' };
      }

      return { [key]: value };
    });

    if (filters.length > 0) {
      where.AND = filters;
    }

    // Configuración de ordenamiento
    const validatedSortBy = this.filterableFields.includes(
      sortBy as keyof IModelMappingsForWhere[T],
    )
      ? (sortBy as string)
      : 'createdAt';

    const validatedSortOrder =
      sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc';

    // Añadir información de paginación y filtros a la request
    request['pagination'] = {
      page: Number(page),
      limit: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
    } as PaginationOptions;

    request['where'] = where;

    return next.handle();
  }
}
