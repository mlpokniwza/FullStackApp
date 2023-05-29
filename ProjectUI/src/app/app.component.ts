import { Component, OnInit } from '@angular/core';
import { SuperHero } from './_models/super-hero';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  public dataSource = new MatTableDataSource<SuperHero>();

  ngOnInit(): void {
    this.setCurrentUser();

  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }

}
