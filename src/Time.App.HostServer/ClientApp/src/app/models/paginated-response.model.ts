export class PaginatedResponse<T> {
    count: number;
    page: number;
    pageSize: number;
    list: T[];
  }
  