import { Component, Input } from '@angular/core';

import { NewsItem } from '../../interfaces';

@Component({
  selector: 'app-profile-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: [
    './news-image.css',
  ],
})
export class NewsItemComponent {
  @Input() item: NewsItem;
}
