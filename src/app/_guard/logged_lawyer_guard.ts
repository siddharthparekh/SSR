import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoggedLawyerGuard implements CanActivate {

    constructor(private sharedUserService: SharedUserService, private router: Router) { }

    canActivate(): boolean {
        if (this.sharedUserService.isLoggedIn() && (this.sharedUserService.getUserTipo() == 0 || this.sharedUserService.getUserTipo() == 2)) {
            return true;
        } else {
            this.router.navigate(["/"]);
            return false;
        }
    }
}
