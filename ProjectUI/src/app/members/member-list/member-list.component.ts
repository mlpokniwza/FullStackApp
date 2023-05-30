import { Component, OnInit } from '@angular/core';
import { Member } from 'app/_models/member';
import { Pagination } from 'app/_models/pagination';
import { User } from 'app/_models/user';
import { UserParams } from 'app/_models/userParams';
import { AuthService } from 'app/_services/auth.service';
import { MembersService } from 'app/_services/members.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;

  constructor(private membersService: MembersService, private authService: AuthService) {
      this.authService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMember();
  }

  loadMember() {
    if (!this.userParams) return;
    this.membersService.getMembers(this.userParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMember();
    }
  }

}
