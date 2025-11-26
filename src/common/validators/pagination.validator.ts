import { BadRequestException } from '@nestjs/common';

export function validatePaginationQuery(
  pagination?: boolean,
  from?: number,
  to?: number,
  search?: string,
  searchField?: string,
  op?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte',
  sortField?: string,
  sortOrder?: 'asc' | 'desc',
) {
  // ---- PAGINATION VALIDATION ----
  const fromValue = from !== undefined ? Number(from) : 0;
  const toValue = to !== undefined ? Number(to) : 10;

  if (isNaN(fromValue) || isNaN(toValue)) {
    throw new BadRequestException('from and to must be numbers');
  }

  if (fromValue < 0 || toValue < 0) {
    throw new BadRequestException('from and to must be non-negative numbers');
  }

  if (toValue < fromValue) {
    throw new BadRequestException('to must be greater than or equal to from');
  }

  // ---- SEARCH & SORT VALIDATION ----
  const allowedFields = ['empNumber', 'name', 'email', 'position', 'role', 'hireDate', 'engagementScore'];
  const allowedOps = ['eq', 'gt', 'lt', 'gte', 'lte'];

  let filter: any = {};
  let sort: any = {};

  // SEARCH
  if (searchField) {
    if (!allowedFields.includes(searchField)) {
      throw new BadRequestException('Invalid searchField');
    }
    let value: string | number = search!;
      if (!isNaN(Number(search))) {
         value = Number(search);
}

    if (typeof value === 'number') {
      const operator = op ?? 'eq'; // default to eq
      if (!allowedOps.includes(operator)) {
        throw new BadRequestException('Invalid operator');
      }

      filter = { [searchField]: { [`$${operator}`]: value} };
    } else if (typeof value === 'string') {
      filter = { [searchField]: { $regex: value, $options: 'i' } };
    } else {
      throw new BadRequestException('Search value must be provided for the searchField');
    }
  }

  // SORT
  if (sortField) {
    if (!allowedFields.includes(sortField)) {
      throw new BadRequestException('Invalid sortField');
    }

    sort[sortField] = sortOrder === 'desc' ? -1 : 1; // default asc
  }

  return { pagination, from: fromValue, to: toValue, filter, sort };
}
