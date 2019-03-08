import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PageScrollConfig, EasingLogic } from 'ngx-page-scroll';
import { Meta, Title } from '@angular/platform-browser';

@Component({
   selector: 'app-landing-soyabogado',
   templateUrl: './landing-soyabogado.component.html',
   styleUrls: ['./landing-soyabogado.component.css']
})

export class LandingSoyabogadoComponent implements OnInit, OnDestroy {

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
   fixedNav = false;
   carouselBanner;
   myEasing: EasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
         // easeInOutExpo easing
         if (t === 0) return b;
         if (t === d) return b + c;
         if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
         return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
   };
   slides = ['/assets/images/img-1@3x.png', '/assets/images/img-2@3x.png', '/assets/images/img-3@3x.png'];
   index = 0;
   infinite = true;
   direction = 'right';
   autoplay = true;

   @HostListener("window:scroll", [])
   onWindowScroll() {
      // console.log($(window).scrollTop());
      if ($(window).scrollTop() > $("#section3").position().top) {
         this.fixedNav = true; this.activeMenu = 0;
         if ($(window).scrollTop() > $("#section5").position().top) {
            this.fixedNav = true; this.activeMenu = 1;
            if ($(window).scrollTop() > $("#section7").position().top) {
               this.fixedNav = true; this.activeMenu = 2;
               if ($(window).scrollTop() > $("#section8").position().top) {
                  this.fixedNav = true; this.activeMenu = 3;
               }
            }
         }
      }
      else {
         this.fixedNav = false;
         this.activeMenu = 0;
      }
   }
   constructor(
      private meta: Meta,
      private title: Title
   ) {
   }

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

   onSelected(e) {
      this.activeDispatch = e.value;
   }

   setMetas() {
      this.meta.removeTag("name='robots'");
      this.title.setTitle("La única comunidad legal basada en méritos reales | Emérita Legal");
      this.meta.addTag({ name: "description", content: "Posiciónate en el mercado por tu trayectoria. Regístrate y únete al único buscador donde la posición no se compra, se gana. Certificamos con datos tu experiencia judicial." });
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag("name='description'");
   }

   indexChanged(index) {
      // console.log('index', index);
   }

}
