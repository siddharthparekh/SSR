import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { HandleError } from "../../_utils/handleError";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class NosotrosService {
   private BASE_URL = environment.api_url;

   constructor(
      private http: HttpClient,
      private handleError: HandleError,
   ) { }


   downloadKitPrensa(): Observable<HttpResponse<any>> {
      return this.http.get(this.BASE_URL + '/info/kitprensa',
         {
            responseType: 'blob',
            observe: 'response'
         })
         .pipe(catchError(this.handleError.handleError));
   }
}