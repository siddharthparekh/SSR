import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';

@Injectable()
export class DatosFacturacionGuard implements CanActivate {

   constructor(
      private sharedUserService: SharedUserService,
      private router: Router,
   ) { }

   canActivate(route: ActivatedRouteSnapshot): boolean {
      const user = this.sharedUserService.getUser();
      if (!user.DatosFacturaciones) {
         this.router.navigate(["/inbox/respuestalegal/datosfacturacion"], { queryParams: route.queryParams });
         return false;
      }
      return true;
   }
}