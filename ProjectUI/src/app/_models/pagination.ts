export interface Pagination {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
}
export class PaginatiedResult<T> {
    result?: T;
    pagination?: Pagination;
}