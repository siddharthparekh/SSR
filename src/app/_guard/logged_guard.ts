import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private userService: SharedUserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
