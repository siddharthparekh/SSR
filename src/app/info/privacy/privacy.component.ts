import { Component, OnInit, OnDestroy} from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta,
    private title: Title) { }

  ngOnInit() {
    this.meta.addTag({
      name: 'description', content: `E4LEGAL ANALYTICS S.L (en adelante EMÉRITA) informa a los usuarios sobre su política respecto del tratamiento y protección de los datos de carácter personal que puedan ser recabados en la navegación o contratación de servicios a través del Sitio Web`
    })
  }
  ngOnDestroy(){
    this.meta.removeTag('name="description"');
  }

}
