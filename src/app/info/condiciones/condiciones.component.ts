import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit, OnDestroy {

  constructor(private meta: Meta,
    private title: Title) { }

  ngOnInit() {
    this.meta.addTag({
      name: 'description', content: `CONDICIONES DE USO PARA USUARIOS
      Las presentes Condiciones de Uso rigen el acceso y la utilización del Sitio Web accesible a través del nombre de dominio www.emerita.legal y sus subdominios (en adelante Sitio Web), así como la contratación a través del mismo.
      La utilización del Sitio Web atribuye la condición de USUARIO del Sitio WEB e implica la aceptación de todos los términos incluidos en estas Condiciones de Uso.
      Cada vez que el USUARIO acceda al Sitio Web debe leer las presentes Condiciones de Uso, ya que tanto el Sitio Web como las condiciones pueden sufrir modificaciones.
      El titular del Sitio Web se reserva la facultad de realizar en cualquier momento y sin necesidad de preaviso cualquier actualización o modificación de sus contenidos y servicios de las presentes Condiciones de Uso y, en general, de cuantos elementos integran el diseño y configuración del Sitio Web.
      Por medio de la aceptación de las presentes Condiciones de Uso, el USUARIO manifiesta que ha leído, entiende y comprende lo aquí expuesto; que es una persona con capacidad suficiente para contratar en caso de querer hacerlo; y que asume todas las obligaciones aquí dispuestas.`
    })
  }
  ngOnDestroy(){
    this.meta.removeTag('name="description"');
  }

}
