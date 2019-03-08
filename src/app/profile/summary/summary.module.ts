import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlockingModule } from '../blocking/blocking.module';
import { ErrorModule } from '../error/error.module';
import { IrjIndicatorModule } from '../irj-indicator/irj-indicator.module';
import { LoadingModule } from '../../shared/components-utils/loading/loading.module';
import { TalkButtonModule } from '../talk-button/talk-button.module';
import { SummaryComponent } from './summary.component';
import { ImageComponent } from './image/image.component';
import { NameComponent } from './name/name.component';
import { SpecsComponent } from './specs/specs.component';
import { SummaryService } from './summary.service';
import { SharedModule } from './../../shared/shared.module';
import { ModalProfileModule } from '../modals/modal.module';

@NgModule({
   imports: [
      CommonModule,
      BlockingModule,
      ErrorModule,
      IrjIndicatorModule,
      LoadingModule,
      TalkButtonModule,
      SharedModule,
      ModalProfileModule
   ],
   declarations: [
      SummaryComponent,
      ImageComponent,
      NameComponent,
      SpecsComponent,
   ],
   exports: [
      SummaryComponent,
   ],
   providers: [
      SummaryService,
   ],
})
export class SummaryModule { }
