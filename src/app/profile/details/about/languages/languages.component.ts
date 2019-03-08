import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-languages',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent {
  @Input() languages: string[];
}
