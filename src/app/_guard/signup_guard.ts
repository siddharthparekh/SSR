
import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ProfesionalService } from '../_services/profesional.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Injectable()
export class SignUpGuard implements CanActivate {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: ProfesionalService) { }
    
  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.queryParams['code'];
    return this.userService.findRegistrationCode(code).pipe(
      map(data => { return true }),
      catchError(err => {
        this.router.navigate(['/']);
        return observableOf(false)
      }), );
    // return Observable.of(true);
  }
}
