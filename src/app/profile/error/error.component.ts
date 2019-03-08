import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-profile-error',
   template: `
    <div *ngIf="!text" class="container">Ha habido un error.</div>
    <div *ngIf="text" class="container">{{text}}.</div>
  `,
})
export class ErrorComponent {
   @Input() text;
};
