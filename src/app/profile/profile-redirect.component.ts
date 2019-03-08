import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   template: '',
})
export class ProfileRedirectComponent implements OnInit {
   constructor(
      private router: Router,
      private route: ActivatedRoute,
   ) { }

   ngOnInit() {
      const url = this.route.snapshot.url;
      const typeSegment = (url[0]).path;
      const token = (url[1]).path;
      if (typeSegment === 'abogado') {
         this.router.navigate(
            [`/abogado-int/${token}`],
            { skipLocationChange: true, preserveQueryParams: true },
         );
      } else if (typeSegment === 'despacho') {
         this.router.navigate(
            [`/despacho-int/${token}`],
            { skipLocationChange: true, preserveQueryParams: true },
         );
      } else {
         this.router.navigate(
            [`/404`],
            { skipLocationChange: true },
         );
      }
   }
}
