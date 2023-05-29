import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void { }

  register() {
    this.authService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error)
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
