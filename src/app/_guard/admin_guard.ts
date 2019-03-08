import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private sharedUserService: SharedUserService, private router: Router) { }

  canActivate(): boolean {
    if (this.sharedUserService.getUserTipo() === 2) {
      return true;
    } else {
      if (this.sharedUserService.isLoggedIn() && this.sharedUserService.getUserTipo() === 0) {
        this.router.navigate(this.sharedUserService.getProfileUrl(this.sharedUserService.getUser(), false));
        return false;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
