import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-condiones-profesionales',
  templateUrl: './condiones-profesionales.component.html',
  styleUrls: ['./condiones-profesionales.component.css']
})
export class CondionesProfesionalesComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta,
    private title: Title) { }

    ngOnInit() {
      this.meta.addTag({
        name: 'description', content: `<b>Emerita.legal</b> es una red cerrada de abogados y procuradores, en caso de que usted quiera unirse a
          <b>emerita.legal</b> como abogado o procurador, por favor, lea este documento antes de realizar el registro,
          ya que realizando el registro entendemos que está de acuerdo con estas normas de aplicación y sus obligaciones.`
      })
    }
    ngOnDestroy(){
      this.meta.removeTag('name="description"');
    }

}
