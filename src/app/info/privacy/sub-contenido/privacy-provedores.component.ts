import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-privacy-provedores',
  template: `
  <div class="row">
    <div class="col-12 col-md-8 offset-md-2">
      <div style="text-align:justify;"><br><br><br>
    <span style="font-weight: 400;"><b>Tratamiento de Proveedores</b></span><br>
    <span style="font-weight: 400;"><b>a) Base jurídica</b></span><br>
    <span style="font-weight: 400;">RGPD: art 6.1.a) El interesado dio su consentimiento para el
    tratamiento de sus datos personales para uno o varios fines
    específicos</span><br>
    <span style="font-weight: 400;">RGPD: art 6.1.b) El tratamiento es necesario para la ejecución de un
    contrato en el que el interesado es parte o para la aplicación a
    petición de este de medidas precontractuales</span><br>
    <span style="font-weight: 400;"><strong>b) Fines del tratamiento</strong> </span><br>
    <span style="font-weight: 400;">Gestión de los datos de los proveedores y los servicios ofrecidos por
    estos</span><br>
    <span style="font-weight: 400;"><strong>c) Colectivo</strong> </span><br>
    <span style="font-weight: 400;">Personas físicas y jurídicas</span><br>
    <span style="font-weight: 400;"><strong>c) Categorías de Datos</strong> </span><br>
    <span style="font-weight: 400;">Datos identificativos: </span><span style="font-weight: 400;">nombre, apellidos, teléfono, correo </span><span style="font-weight: 400;">electrónico, DNI, CIF</span><br>
    <span style="font-weight: 400;">Datos económico-financieros: Datos económicos de nómina, créditos, préstamos, avales, deducciones impositivas, retenciones judiciales (en su caso), otras retenciones (en su caso).</span><br>
    <span style="font-weight: 400;">Datos bancarios</span><br>
    <span style="font-weight: 400;"><strong>d) Categoría destinatarios</strong> </span><br>
    <span style="font-weight: 400;">Gestoría fiscal-administrativa: </span><span style="font-weight: 400;">Misión Emprende S.L, CIF: B70352018, Plaza de Vigo 1, entr. B, 15701
    Santiago de Compostela (A Coruña).</span><br>
    <span style="font-weight: 400;"><strong>e) Transf. Internacional</strong> </span><br>
    <span style="font-weight: 400;">No están previstas transferencias internacionales de los datos.</span><br>
    <span style="font-weight: 400;"><strong>f) Plazo supresión</strong> </span><br>
    <span style="font-weight: 400;">Se conservarán durante el tiempo necesario para cumplir con la
    finalidad para la que se recabaron y para determinar las posibles
    responsabilidades que se pudieran derivar de dicha finalidad y del
    tratamiento de los datos. Será de aplicación lo dispuesto en la
    normativa de archivos y documentación.</span><br>
    <span style="font-weight: 400;"><strong>g) Medidas de seguridad</strong> </span><br>
    <span style="font-weight: 400;">Las previstas en el RGPD y puestas en marcha por EMÉRITA LEGAL</span><br>
    <span style="font-weight: 400;"><b>h) Entidad responsable</b></span><br>
    <span style="font-weight: 400;">E4LEGAL ANALYTICS S.L </span><br>
    <span style="font-weight: 400;">B70514831 </span><br>
    <span style="font-weight: 400;">Centro de Emprendemento de Galicia, Cidade da Cultura de Galicia, Monte Gaiás, s/n, 15707, Santiago de Compostela (A
      Coruña) info@emerita.legal</span><br>
    </div>
    </div>
    </div>
  `,
  styles: [`
    span {
      display: block;
      margin-bottom: 5px;
    }
    `]
})
export class PrivacyProvedoresComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
  }
}
