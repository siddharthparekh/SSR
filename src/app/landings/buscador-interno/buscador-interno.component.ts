import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-buscador-interno',
   templateUrl: './buscador-interno.component.html',
   styles: [`
         .container{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
         }
         app-buscador {
            width: 100%;
            padding: 15% 0 25% 0;
         }
  `]
})
export class BuscadorInternoComponent implements OnInit {

   constructor() { }

   ngOnInit() {
   }

}
