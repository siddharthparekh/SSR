import { Component, Input } from '@angular/core';

import { FeedbackItem } from '../interfaces';

@Component({
  selector: 'app-profile-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css']
})
export class FeedbackItemComponent {
  @Input() item: FeedbackItem;
}
