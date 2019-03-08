import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var gtag: any;

@Component({
   selector: 'app-results-actions',
   templateUrl: './results-actions.component.html',
   styleUrls: ['./results-actions.component.css']
})
export class ResultsActionsComponent implements OnInit {

   msgSuccess: string;
   title: string;
   errMsg: string;
   resultado: boolean;
   buttonTitle: string;
   redirect: string;

   constructor(
      private route: ActivatedRoute,
      private router: Router
   ) { }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.resultado = (params['r'] == 'true');
      });
      this.route.queryParams.subscribe(params => {
         if (params['msg']) this.errMsg = params['msg'];
         if (params['msgS']) this.msgSuccess = params['msgS'];
         if (params['msgTitle']) this.title = params['msgTitle'];
         if (params['redirect']) this.redirect = params['redirect'];
         if (params['buttonTitle']) this.buttonTitle = params['buttonTitle'];
      });
      this.seguimiento(this.router.url);
   }

   seguimiento(url: string) {
      if (url.includes('invoice/checkout/')) 
      gtag('event', 'conversion', {
         'send_to': 'AW-815292843/OSj1CPCsspEBEKvD4YQD',
         'transaction_id': ''
      });
   }

}
