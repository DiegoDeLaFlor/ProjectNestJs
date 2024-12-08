export interface Pagination<T> {
    results: T[];
    total: number;
    page: number;
    limit: number;
}