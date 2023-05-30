import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/_models/member';
import { environment } from 'environments/environment.development';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  // constructor(public http: HttpClient) { }

  // getMembers() {
  //   return this.http.get<Member[]>(this.baseUrl + 'users');
  // }

  // getMember(username: string) {
  //   return this.http.get<Member>(this.baseUrl + 'users/' + username);
  // }

  // updateMember(member: Member) {
  //   return this.http.put(this.baseUrl + 'users', member);
  // }


  members: Member[] = [];

  constructor(public http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(member => {
        this.members = member;
        return member;
      })
    );
  }

  getMember(username: string) {
    var member = this.members.find(member => member.username === username);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl +'users/set-main-phot/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl +'users/delete-photo/' + photoId);
  }
}
