import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-block-content',
   templateUrl: './block.content.component.html',
   styleUrls: ['./block.content.component.css'],
   providers: [ ]
})
export class BlockContentComponent implements OnInit {
   @Input() blocked: boolean;
   @Input() is_ranking: boolean;

   constructor(private router: Router) { }

   ngOnInit() {
      $(function () {
         $('[data-toggle="tooltip"]')['tooltip']()
      })
   }
   
}