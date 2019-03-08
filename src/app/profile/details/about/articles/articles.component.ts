import { Component, Input } from '@angular/core';
import { ArticlesItem } from '../interfaces';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent {
  @Input() items: ArticlesItem[];
}
