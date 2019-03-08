import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';

@Injectable()
export class LoginGuard implements CanActivate {

   constructor(private sharedUserService: SharedUserService, private router: Router) { }

   canActivate(): boolean {
      if (!this.sharedUserService.isLoggedIn()) {
         return true;
      } else {
         if (this.sharedUserService.getUserTipo() !== 1)
            this.router.navigate(this.sharedUserService.getProfileUrl(this.sharedUserService.getUser(), false));
         else { console.log("SI"); this.router.navigate(["/"]); }
         return true;
      }
   }
}
