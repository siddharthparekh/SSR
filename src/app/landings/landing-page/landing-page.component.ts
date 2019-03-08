import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LinkService } from './../../_services/linkService';

@Component({
   selector: "app-landing-page",
   templateUrl: "./landing-page.component.html",
   styleUrls: ["./landing-page.component.css"],
   providers: [LinkService]
})
export class LandingPageComponent implements OnInit, OnDestroy {
   reqInProg: boolean = false;

   constructor(
      private title: Title,
      private meta: Meta,
      private link: LinkService
   ) { }
   ngOnDestroy() {
      this.meta.removeTag('name="description"');
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.link.removeCanonicalLink();
   }

   ngOnInit() {
      this.title.setTitle("Emérita Legal | Los mejores abogados según su experiencia judicial");
      this.meta.addTag({
         name: "description",
         content:
            "Analizamos millones de resoluciones judiciales para revelar la identidad de los abogados más eficaces en cada especialidad. Encuentra al mejor especialista."
      });
      this.meta.removeTag("name='robots'");
      this.link.addTag({ rel: "canonical", href: "https://wwww.emerita.legal" });
   }
}
