import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/_models/member';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'Users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'Users/' + username);
  }

  // getHttpOptions() {
  //   const userString = localStorage.getItem('user');
  //   if (!userString) return;
  //   const user = JSON.parse(userString);
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + user.token
  //     })
  //   }
  // }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'Users', member);
  }
}
