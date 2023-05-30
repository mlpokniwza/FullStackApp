import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/_models/member';
import { PaginatiedResult } from 'app/_models/pagination';
import { environment } from 'environments/environment.development';
import { map, of, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from 'app/_models/user';
import { UserParams } from 'app/_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  paginationResult: PaginatiedResult<Member[]> = new PaginatiedResult<Member[]>;

  constructor(public http: HttpClient, private authService: AuthService) { 
    // this.authService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => {
    //     if (user) {
    //       // this.userParams = new UserParams(user);
    //       this.user = user;
    //     }
    //   }
    // })
  }

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);

    // const response = this.memberCache.get(Object.values(params).join('-'))

    return this.getPaginationResult<Member[]>(this.baseUrl + 'users', params)
  }

  private getPaginationResult<T>(url: string, params: HttpParams) {
    const paginationResult: PaginatiedResult<T> = new PaginatiedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
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

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return params;
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
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
