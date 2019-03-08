import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedUserService } from '../../_services/shared-user.service';
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { IUsuarioStorage } from '../../_models/UsuarioStorage';
import { IProducto } from '../../_models/Producto';
import { updateShoppingCarTrigger } from '../../_utils/utilFunctions';

@Component({
   selector: 'app-bay-profile',
   templateUrl: './bay-profile.component.html',
   styleUrls: ['./bay-profile.component.css'],
   providers: [SharedUserService, ShoppingCarService]
})
export class BayProfileComponent implements OnInit {
   user_id: number;
   @Input()
   productoId: number = 0;
   @Input()
   profesionalId: number = 0;

   loading: boolean = false;

   @Input()
   queryParams: any = {};
   @Input()
   return_url: string;
   constructor(
      private router: Router,
      private sharedUserService: SharedUserService,
      private shoppingCarService: ShoppingCarService
   ) {
      this.user_id = this.sharedUserService.getUserId();
   }

   ngOnInit() {

   }

   load(ProfesionalId: number, TopId: number) {

   }

   bay_profile(value) {
      //   this.loading = true;
      //   this.shoppingCarService.save_product({
      //       "productoId": this.productoId,
      //   }).subscribe(( product: any) =>{
      //       this.loading = false;
      //       updateShoppingCarTrigger.next();
      //   })
   }

   close() {
      $('#modal-bay-profile-' + this.profesionalId)['modal']('close');
   }
}