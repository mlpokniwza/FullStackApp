import { Component, OnInit } from '@angular/core';
import { User } from 'app/_models/user';
import { AdminService } from 'app/_services/admin.service';
import { RolesModalComponent } from 'app/modals/roles-modal/roles-modal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  bsModelRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ];

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }



  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        this.users = users
      }
    })

  }

  openRolesModal(users: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: users.username,
        availableRoles: this.availableRoles,
        selectRoles: [...users.roles]
      }
    }
    this.bsModelRef = this.modalService.show(RolesModalComponent, config);
    // this.bsModelRef.content!.closeBtnName = 'Close';
  }
}
