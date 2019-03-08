import { Component, OnChanges, Input, Output, EventEmitter, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ProvinciasService } from './../../_services/provincias.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { BayProfileComponent } from '../bay-profile/bay-profile.component';
import { IProducto } from '../../_models/Producto';

@Component({
   selector: 'app-result-badge',
   templateUrl: './result-badge.component.html',
   styleUrls: ['./result-badge.component.css'],
   providers: [ProvinciasService]
})
export class ResultBadgeComponent implements OnChanges, OnInit {

   @Input() abogado: any;
   @Input() index: number;
   @Input() isRanking: boolean;
   @Input() hasAccess: boolean;
   @Input() mostrarDerechos = true;

   @Output() onClickNameEmitter = new EventEmitter<number>();
   @Output() onClickBlock = new EventEmitter<any>();

   constructor() { }

   ngOnInit() {
      $(function () {
         $('[data-toggle="tooltip"]')['tooltip']()
      });
   }
   ngOnChanges() {
      if (this.abogado && this.abogado.ProfesionalesEstadistica) {
         this.abogado.ProfesionalesEstadistica.tipoAntiguedad = getTipoAntiguedad(this.abogado.ProfesionalesEstadistica.antiguedad);
         this.abogado.ProfesionalesEstadistica.rating = this.abogado.ProfesionalesEstadistica.rating
            && Number((this.abogado.ProfesionalesEstadistica.rating).toFixed());
      }
      this.hasAccess = true;
   }
   clickOnCard() {
      const id = (this.abogado.Profesional || {}).id || (this.abogado.ProfesionalesEstadistica || {}).id;
      this.onClickNameEmitter.emit(id);
   }
   plan() {
      this.onClickBlock.emit(this.abogado);
   }
}

const getTipoAntiguedad = (antiguedad) => {
   if (antiguedad <= 5) {
      return 'Junior';
   } else if (antiguedad > 5 && antiguedad <= 10) {
      return 'Intermediate'
   } else if (antiguedad > 10 && antiguedad <= 15) {
      return 'Advanced'
   } else if (antiguedad > 15) {
      return 'Senior'
   }
}
