import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta,
    private title: Title) { }

    ngOnInit() {
      this.meta.addTag({
        name: 'description', content: `<h4>Uso de cookies en el sitio web</h4>
        Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación. Si continúa navegando, consideramos que acepta su uso.`
      });
    }
    ngOnDestroy(){
      this.meta.removeTag('name="description"');
    }

}
