import { Component, Input } from '@angular/core';
import { NewsItem } from '../interfaces';

@Component({
  selector: 'app-profile-news',
  templateUrl: './news.component.html',
  styleUrls: [
    '../../../styles/blockable.css',
  ],
})
export class NewsComponent {
  @Input() items: NewsItem[];
}
