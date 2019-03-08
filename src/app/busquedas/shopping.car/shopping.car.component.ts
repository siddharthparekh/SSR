import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedUserService } from '../../_services/shared-user.service';
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProducto } from '../../_models/Producto';
import { OnUpdateShoppingCar, updateShoppingCarTrigger } from '../../_utils/utilFunctions';


@Component({
   styleUrls: ['./shopping.car.component.css'],
   selector: 'shopping-car',
   templateUrl: 'shopping.car.component.html',
   providers: [SharedUserService, ShoppingCarService]
})

export class ShoppingCarComponent implements OnInit {
   items: any[] = [];
   total: number = 0;

   user_id: number;
   return_url: string = '/'
   queryParams: any = {};

   constructor(
      private sharedUserService: SharedUserService,
      private shoppingCarService: ShoppingCarService,
      private router: Router,
      private activateRouter: ActivatedRoute,
      private _location: Location,
   ) {
      this.user_id = this.sharedUserService.getUserId();
   }

   ngOnInit() {
      this.get_products();
      OnUpdateShoppingCar.subscribe((user_id: any) => {
         this.get_products(user_id);
      })
      this.activateRouter.queryParams.subscribe((queryParams: any) => {
         this.queryParams = queryParams;
         // if (queryParams['redirect']) {
         //    this.return_url = queryParams['redirect'];
         //    console.log(this.return_url);
         // }
      })
   }

   get_products(user_id?: number) {
      this.shoppingCarService.products().subscribe((products: IProducto[]) => {
         this.items = products.map((product: IProducto) => {
            product.precio = product.precio / 100;
            return product;
         });
         this.get_total();
      })
   }

   delete(item: any) {
      /*let result = confirm('¿Desea borrar este producto?');
      if(result){*/
      this.shoppingCarService.delete_product(item.id).subscribe(() => {
         this.get_total();
         updateShoppingCarTrigger.next();
      })
      //}
   }

   get_total() {
      this.total = 0;
      this.items.forEach((item: any) => {
         this.total += item.precio;
      })
   }

   returnUrl() {
      this._location.back();
   }

}