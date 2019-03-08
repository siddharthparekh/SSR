import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedUserService } from './../_services/shared-user.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Http } from '@angular/http';



@Injectable()
export class HandleError {

   constructor(private router: Router, private sharedUserService: SharedUserService) { }

   handleError = (error: HttpErrorResponse | any) => {
      let errMsg: string;
      if (error)
         if (error.error instanceof Error || typeof (error.error) === "object") {
            errMsg = "Error interno";
         } else {
            errMsg = error.error ? error.error : error.message;
            if (errMsg === 'SIN_PERMISOS_RELOGIN') {
               this.sharedUserService.logout();
               this.router.navigate(["/"]);
            }
         }
      return observableThrowError(errMsg);
   }
}
