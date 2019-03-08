import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-privacy-personas-fisicas',
  template: `
   <div class="container">
   <p>&nbsp;</p>
   <p><strong>TRATAMIENTO PROFESIONALES PERSONAS F&Iacute;SICAS</strong></p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Base jur&iacute;dica</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">-Art. 6.1 f)</span> <span style="font-weight: 400;">RGPD: el tratamiento se realiza en base al inter&eacute;s leg&iacute;timo de los usuarios de servicios legales en conocer esta informaci&oacute;n, con el objeto de que les sirva de ayuda en la toma de decisiones a la hora de contratar a un profesional en el &aacute;mbito legal y se garanticen en mayor medida sus derechos como consumidores. </span></p>
   <p><span style="font-weight: 400;">En este sentido debe tenerse en cuenta que la propia legislaci&oacute;n incluye entre las garant&iacute;as procesales que integran el derecho a un proceso justo, el derecho de todos los ciudadanos a la defensa y a la asistencia letrada, as&iacute; como el deber de los profesionales del derecho de colaborar en la publicidad de la Justicia. Por ello, el inter&eacute;s leg&iacute;timo de EM&Eacute;RITA LEGAL se basa en el suministro de informaci&oacute;n que contribuye de forma efectiva a mantener la seguridad jur&iacute;dica a la que hace referencia la legislaci&oacute;n, as&iacute; como a la transparencia del sector legal.</span></p>
   <p><span style="font-weight: 400;">-Art. 6.1 a) RGPD: el consentimiento para aquellos casos en los que un interesado solicita la inclusi&oacute;n de informaci&oacute;n sobre su actividad profesional con sus datos.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Fines del tratamiento</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Usamos la informaci&oacute;n para crear estad&iacute;sticas, as&iacute; como para crear puntuaciones y &ldquo;ratings&rdquo; de la actividad profesional. Para su elaboraci&oacute;n se utiliza &uacute;nicamente informaci&oacute;n relacionada con la actividad profesional y respecto a las puntuaciones recurrimos a un algoritmo muy desarrollado y ampliamente testado por la comunidad matem&aacute;tica.</span></p>
   <p><span style="font-weight: 400;">Guiamos a nuestros usuarios para que sepan c&oacute;mo interpretar y usar las estad&iacute;sticas y puntuaciones, sin decirles en ning&uacute;n caso si contratar o no a un profesional.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Colectivo</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Profesionales personas f&iacute;sicas</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Categor&iacute;a de datos</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Nombre, apellidos, n&uacute;mero de colegiado, colegio profesional y datos de contacto de la actividad profesional.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Categor&iacute;a de destinatarios</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Usuarios y clientes que navegan por nuestro Sitio Web.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Transferencia internacional</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">No se prev&eacute;n transferencias internacionales de los datos.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Plazo supresi&oacute;n </strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Conservamos los datos personales con car&aacute;cter anual, siempre que los profesionales personas f&iacute;sicas consten de alta en la actividad profesional como colegiados ejercientes.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Medidas de seguridad</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Como consecuencia de nuestra evaluaci&oacute;n de impacto, que incluye la ponderaci&oacute;n del inter&eacute;s leg&iacute;timo alegado frente a los intereses y derechos de los profesionales personas f&iacute;sicas, &uacute;nicamente tratamos y mostramos los datos personales de aquellos profesionales que cuentan con una muestra suficiente a fines estad&iacute;sticos, siempre y cuando sus puntuaciones den lugar a resultados excelentes (IRJ igual o mayor a 70 en al menos una especialidad); ello a fin de evitar causar alg&uacute;n da&ntilde;o, a&uacute;n eventual, a los profesionales o a su reputaci&oacute;n profesional. Adem&aacute;s, en todo caso, los profesionales pueden acceder a sus datos con su certificado ACA y decidir hacerlos privados o mantenerlos ocultos en cualquier momento a trav&eacute;s de los ajustes de privacidad disponibles. </span></p>
   <p><span style="font-weight: 400;">El resto de los datos personales se hayan debidamente anonimizados, de forma que el interesado a quien se refiere la informaci&oacute;n no es o no resulta en modo alguno identificable. </span></p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong>Inexistencia de elaboraci&oacute;n de perfiles ni decisiones automatizadas</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">EM&Eacute;RITA LEGAL no procede a realizar decisiones automatizadas sin que medie intervenci&oacute;n humana, ni se elaboran perfiles del interesado.</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong> Derechos de los interesados</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">Puede oponerse al tratamiento indicado debiendo en estos casos existir un motivo leg&iacute;timo y fundado, referido a una concreta situaci&oacute;n personal que lo justifique. </span></p>
   <p><span style="font-weight: 400;">Para el ejercicio de este derecho puede dirigir su solicitud a </span><a href="mailto:profesionales@emerita.legal"><span style="font-weight: 400;">profesionales@emerita.legal</span></a><span style="font-weight: 400;">, debiendo adjuntar copia de documento que acredite su identidad (DNI, pasaporte, o similar).</span></p>
   <p>&nbsp;</p>
   <ul>
   <li><strong><strong> Entidad responsable</strong></strong></li>
   </ul>
   <p>&nbsp;</p>
   <p><span style="font-weight: 400;">E4LEGAL ANALYTICS S.L </span></p>
   <p><span style="font-weight: 400;">B70514831 &nbsp;</span></p>
   <p><span style="font-weight: 400;">Centro de Emprendemento de Galicia, Cidade da Cultura de Galicia, Monte Gai&aacute;s, s/n, 15707, Santiago de Compostela (A Coru&ntilde;a) info@emerita.legal </span></p>
   <p>&nbsp;</p>
   </div>
  `,
  styles: [`
    span {
      display: block;
      margin-bottom: 5px;
    }
    `]
})
export class PrivacyProfesionalPersonasFisicasComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
  }
}
