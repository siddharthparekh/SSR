import { Component, OnInit } from '@angular/core'

@Component({
   selector: 'app-aca-presentacion',
   templateUrl: './aca-presentacion.component.html',
   styleUrls: ['./aca-presentacion.component.css', '../common.css'],
})
export class AcaPresentacionComponent implements OnInit {
   privacyPolicy = false
   recibeNews = false

   constructor() { }

   ngOnInit() { }

   togglePrivacyPolicy(e) {
      this.privacyPolicy = e.target.checked
   }

   toggleRecibeNews(e) {
      this.recibeNews = e.target.checked
   }
   goACA() {
      window.location.href = '/aca_auth';
   }
}
