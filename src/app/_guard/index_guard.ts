import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';
import { Observable } from 'rxjs';

@Injectable()
export class IndexGuard implements CanActivate {

   constructor(private sharedUserService: SharedUserService, private router: Router) { }

   canActivate(): boolean {
      if (this.sharedUserService.isLoggedIn()) {
         if (this.sharedUserService.getUserTipo() !== 1)
            this.router.navigate(this.sharedUserService.getProfileUrl(this.sharedUserService.getUser(), false));
      }
      return true;
   }
}
