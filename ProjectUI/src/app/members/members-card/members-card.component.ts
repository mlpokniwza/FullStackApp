import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'app/_models/member';
import { AuthService } from 'app/_services/auth.service';
import { MembersService } from 'app/_services/members.service';
import { PresenceService } from 'app/_services/presence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.css'],
  // encapsulation: ViewEncapsulation.Emulated,
})
export class MembersCardComponent implements OnInit {
  @Input() member: Member | undefined;


  constructor(public presenceService: PresenceService,
    private membersService: MembersService, private toastrService: ToastrService) {
  }

  ngOnInit(): void { }




}
