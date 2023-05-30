import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatiedResult } from "app/_models/pagination";
import { map } from "rxjs";

export function getPaginationResult<T>(url: string, params: HttpParams, http: HttpClient) {
    const paginationResult: PaginatiedResult<T> = new PaginatiedResult<T>;
    return http.get<T>(url, { observe: 'response', params }).pipe(
        map(response => {
            if (response.body) {
                paginationResult.result = response.body;
            }

            const pagination = response.headers.get('Pagination');
            if (pagination) {
                paginationResult.pagination = JSON.parse(pagination);
            }
            return paginationResult;
        })
    );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    if (pageNumber && pageSize) {
        params = params.append('pageNumber', pageNumber);
        params = params.append('pageSize', pageSize);
    }
    return params;
}