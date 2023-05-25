import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('registeration successfu;');
        console.log(this.model);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('cancelled');
  }
}
