import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = '/Auth/';

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(environment.apiUrl + this.url + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(environment.apiUrl + this.url + 'register', model);
  }
}
