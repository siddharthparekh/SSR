import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shared-link',
  templateUrl: './shared-link.component.html',
  styleUrls: ['./shared-link.component.css']
})
export class SharedLinkComponent implements OnChanges {
  @Input() socialNetwork: string;
  public shareLinkUrl;
  public shareLinkClass = {};
  private url: string;

  constructor() {
    this.url = encodeURIComponent(location.href.replace('localhost:4200', 'app.emerita.legal'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['socialNetwork']) {
      if ('fb' === this.socialNetwork) {
        this.shareLinkClass['fa-facebook-f'] = true;
        this.shareLinkUrl = `https://facebook.com/sharer.php?u=${this.url}`;
      }
      if ('tw' === this.socialNetwork) {
        this.shareLinkClass['fa-twitter'] = true;
        this.shareLinkUrl = `https://twitter.com/intent/tweet?text=${this.socialNetwork}%20${this.url}`;
      }
      if ('in' === this.socialNetwork) {
        this.shareLinkClass['fa-linkedin-in'] = true;
        this.shareLinkUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.socialNetwork}`;
      }
    }
  }
}
