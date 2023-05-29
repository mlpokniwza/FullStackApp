import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'app/_models/member';
import { User } from 'app/_models/user';
import { AuthService } from 'app/_services/auth.service';
import { MembersService } from 'app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member: Member | undefined;
  user: User | null = null;

  constructor(private memberService: MembersService, 
    private authService: AuthService, private toastr: ToastrService) {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.user = user
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
      }
    })
  }

  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Member updated');
        this.editForm?.reset(this.member);
      }
    })
  }


}

