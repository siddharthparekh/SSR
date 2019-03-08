import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
   selector: 'app-landing-soybogado-emerita',
   templateUrl: './landing-soybogado-emerita.component.html',
   styleUrls: ['./landing-soybogado-emerita.component.css']
})
export class LandingSoybogadoEmeritaComponent implements OnInit, OnDestroy {

   activeMenu = 0;
   dispatches = [
      { value: '0', label: 'Hasta 3 abogados' },
      { value: '1', label: 'Hasta 6 abogados' },
      { value: '2', label: 'Hasta 10 abogados' },
      { value: '3', label: '>10 abogados' }
   ]
   tableData: any;
   active = 0;
   activeDispatch = 0;
   selectedDispatch = '0';

   constructor(
      private meta: Meta,
      private title: Title
   ) { }

   ngOnInit() {
      this.tableData = [
         {
            abogados: 39.95,
            despachos: [109.95, 159.95, 209.95, "Contactar con el departamento de ventas"]
         }, {
            abogados: 29.95,
            despachos: [99.95, 149.95, 199.95, "Contactar con el departamento de ventas"]
         }];
      this.setMetas();
   }
   ngOnDestroy() {
      this.unsetMetas();
   }
   setMetas() {
      this.meta.removeTag("name='robots'");
      this.title.setTitle("La distinción de los mejores expertos legales | Emérita Legal");
      this.meta.addTag({ name: "description", content: "La primera red que agrupa anualmente a los mejores abogados certificados en las distintas especialidades según su índice de rendimiento judicial" });
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag("name='description'");
   }
   onSelected(e) {
      this.activeDispatch = e.value;
   }
}
