import { Component, OnInit } from '@angular/core';
import { Member } from 'app/_models/member';
import { User } from 'app/_models/user';
import { AuthService } from 'app/_services/auth.service';
import { MembersService } from 'app/_services/members.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member | undefined;
  user: User | null = null;

  constructor(private memberService: MembersService, private authService: AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.user = user
        console.log(this.user);
      }
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }


  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: temp_member => {
        this.member = temp_member;
        console.log(this.member);
      }
    })
  }


}

