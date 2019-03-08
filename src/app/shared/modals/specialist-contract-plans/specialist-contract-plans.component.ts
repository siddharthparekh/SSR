import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from '../../../_models/Producto';

@Component({
   selector: 'app-specialist-contract-plans',
   templateUrl: './specialist-contract-plans.component.html',
   styleUrls: ['./specialist-contract-plans.component.css']
})
export class EspecialistContractPlansComponent implements OnChanges {

   @Input() gamasProducto: IProducto[];
   @Input() productosCarrito: IProducto[];
   @Output() onProductSelected = new EventEmitter<IProducto>();
   @Output() onComprarAnalitico = new EventEmitter<IProducto>();

   constructor(
      private router: Router
   ) { }

   ngOnChanges() {
      this.productsAlreadyAdded();
   }

   bay_profile(producto: IProducto) {
      this.onProductSelected.emit(producto);
   }
   bay_Analitico(producto: IProducto) {
      this.onComprarAnalitico.emit(producto);
   }
   productsAlreadyAdded() {
      this.gamasProducto = this.gamasProducto.map((p: IProducto) => {
         p['isAdded'] = this.productosCarrito.some((i: IProducto) => {
            return i.id == p.id;
         })
         return p;
      })
   }
}