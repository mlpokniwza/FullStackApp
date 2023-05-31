import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return false;
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        else {
          this.toastr.error('You cannot access this page')
          return false;
        }
      })
    )
  }
}