import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/_models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error)
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
