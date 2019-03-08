import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';
import { Observable } from 'rxjs/Rx';
import { IUsuarioStorage } from './../_models/UsuarioStorage';

@Injectable()
export class LawyerBApproved implements CanActivate {

  constructor(private sharedUserService: SharedUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userUrlId = state.url.split('/')[2];
    const user: IUsuarioStorage = this.sharedUserService.getUser();
    if (!user.isSignupAprobed && user.Estadisticas.idSolr == userUrlId && user.tipoProfesional == 1) {
      return false;
    } else {
      return true;
    }
  }
}
