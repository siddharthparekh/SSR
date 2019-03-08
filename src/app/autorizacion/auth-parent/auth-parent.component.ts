import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
   selector: 'app-auth-parent',
   template: `
  <div>
  <router-outlet></router-outlet>
  <div>
  `,
   styles: [`
    
    `]
})
export class AuthParentComponent implements OnInit {

   constructor() { }

   ngOnInit() {
   }

}
