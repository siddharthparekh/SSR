import { Component, Input } from '@angular/core';

import { ArticlesItem } from '../../interfaces';

@Component({
  selector: 'app-profile-articles-item',
  templateUrl: './articles-item.component.html',
})
export class ArticlesItemComponent {
  @Input() item: ArticlesItem;
}
