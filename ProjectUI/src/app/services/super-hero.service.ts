import { Injectable } from '@angular/core';
import { SuperHero } from '../models/super-hero';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService {
  private url = 'SuperHero';

  constructor(private http: HttpClient) {}

  // public getSuperHeroes(): Observable<SuperHero[]> {
  //   return this.http.get<SuperHero[]>(`${environment.apiUrl}/${this.url}`);
  // }

  // public getLimitedRows(limit: number): Observable<any> {
  //   const url = `${environment.apiUrl}/${this.url}?limit=${limit}`;
  //   return this.http.get<any>(url);
  // }

  // public getFilteredLimitedRows(
  //   limit: number,
  //   filter: string
  // ): Observable<any> {
  //   const url = `${environment.apiUrl}/${this.url}/filter?limit=${limit}&filter=${filter}`;
  //   return this.http.get<any>(url);
  // }

  // public getFilteredLimitedRow(filters: SuperHero): Observable<any> {
  //   const url = `${environment.apiUrl}/${this.url}/id=${filters.id}&name=${filters.name}&power=${filters.firstName}&power=${filters.lastName}&power=${filters.place}`;
  //   return this.http.get<SuperHero[]>(url);
  // }

  public getHeroes(
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    place: string,
    limit: number
  ): Observable<any> {
    console.log('service', limit, id, name, firstName, lastName, place);
    var url = `${environment.apiUrl}/${this.url}?id=${id}&name=${name}&firstName=${firstName}&lastName=${lastName}&place=${place}&limit=${limit}`;
    console.log(url);
    return this.http.get<SuperHero[]>(url);
  }

  public updateHero(hero: SuperHero): Observable<SuperHero[]> {
    return this.http.put<SuperHero[]>(
      `${environment.apiUrl}/${this.url}`,
      hero
    );
  }
  public createHero(hero: SuperHero): Observable<SuperHero[]> {
    return this.http.post<SuperHero[]>(
      `${environment.apiUrl}/${this.url}`,
      hero
    );
  }
  public deleteHero(hero: SuperHero): Observable<SuperHero[]> {
    return this.http.delete<SuperHero[]>(
      `${environment.apiUrl}/${this.url}/${hero.id}`
    );
  }

  // public getFilteredLimitedRows(
  //   limit: number,
  //   filter: string,
  //   type: string
  // ): Observable<any> {
  //   const url = `${environment.apiUrl}/${this.url}?limit=${limit}&filter=${filter}&type=${type}`;
  //   return this.http.get<any>(url);
  // }
}
