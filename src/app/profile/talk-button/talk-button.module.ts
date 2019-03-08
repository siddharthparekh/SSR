import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalkButtonComponent } from './talk-button.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
   ],
   declarations: [
      TalkButtonComponent,
   ],
   exports: [
      TalkButtonComponent,
   ],
})
export class TalkButtonModule { }
