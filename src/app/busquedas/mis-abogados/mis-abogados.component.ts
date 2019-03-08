import { Component, OnInit } from '@angular/core';
import { ToastyConfig, ToastyService, ToastOptions } from 'ng2-toasty';
import { PaginationInstance } from 'ngx-pagination';

import { IProfesional } from '../../_models/Profesional';
import { ProfesionalService } from '../../_services/profesional.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { Router } from '@angular/router';
import { AccessLevel, AccessMode } from '../../profile/interfaces/profile-mode';

@Component({
   selector: "app-mis-abogados",
   templateUrl: "./mis-abogados.component.html",
   styleUrls: ["./mis-abogados.component.css"],
   providers: [ProfesionalService, ShoppingCarService]
})
export class MisAbogadosComponent implements OnInit {
   reqInProg = false;
   abogados: any[] = [];
   pagesDisplay = 6;

   public config: PaginationInstance = {
      id: "custom",
      itemsPerPage: 3,
      currentPage: 1
   };

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private sharedUserService: SharedUserService,
      private profesionalService: ProfesionalService,
      private shoppingService: ShoppingCarService,
      private router: Router
   ) {
      this.toastyConfig.theme = "default";
   }

   ngOnInit() {
      this.loadAbogados();
   }

   loadAbogados() {
      this.reqInProg = true;
      // HABILITAR
      this.shoppingService.misAbogados().subscribe(
         abogados => {
            this.abogados = abogados;
            this.reqInProg = false;
            this.setAccess(this.abogados);
         },
         error => {
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = error;
            this.toastyService.error(toast);
            this.reqInProg = false;
         }
      );
   }
   setAccess(abogados: any) {
      for (const abogado of abogados) {
         let access = true;
         const producto = abogado.producto;
         const accessMode: AccessMode = producto.tipo == 'statistics' ? AccessMode.Ranking : AccessMode.Directory;
         const isEssential = accessMode == AccessMode.Directory && producto.gama == "a" ? true : false;
         if (isEssential) access = false;
         abogado.hasAccess = access;
      }
   }
   goToProfile(id: number) {
      const isAnonymous = isNaN(id);
      let profesional = this.abogados.find(abogado => abogado.Profesional.id == id);
      if (!profesional) throw new Error("id abogado no encontrado");
      const url = this.sharedUserService.getProfileUrl(null,
         isAnonymous,
         { userName: profesional.Usuario.nombre, userId: profesional.Profesional.id });
      let qparams = {} as any;
      qparams.d = profesional.producto.derechoId;
      if (profesional.producto.categoria) qparams.c = profesional.producto.categoria;
      if (profesional.producto.alcance) qparams.a = profesional.producto.alcance;

      this.router.navigate(url, {
         queryParams: qparams
      });
   }
}
