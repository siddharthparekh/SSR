import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorModule } from '../../error/error.module';
import { LoadingModule } from '../../../shared/components-utils/loading/loading.module';
import { FeedbackComponent } from './feedback.component';
import { ProfileStarsComponent } from './stars/profile-stars.component';
import { FeedbackItemComponent } from './item/feedback-item.component';
import { FeedbackService } from './feedback.service';

@NgModule({
  imports: [
    CommonModule,
    ErrorModule,
    LoadingModule,
  ],
  declarations: [
    FeedbackComponent,
    ProfileStarsComponent,
    FeedbackItemComponent,
  ],
  exports: [
    FeedbackComponent,
  ],
  providers: [
    FeedbackService,
  ],
})
export class FeedbackModule {}
