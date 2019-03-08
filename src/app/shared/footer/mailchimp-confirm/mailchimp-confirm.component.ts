import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { routerNgProbeToken } from '@angular/router/src/router_module';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-mailchimp-confirm',
  templateUrl: './mailchimp-confirm.component.html',
  styleUrls: ['./mailchimp-confirm.component.css']
})
export class MailchimpConfirmComponent implements OnInit {
  email: string;
  mailChimpEndpoint = 'https://legal.us19.list-manage.com/subscribe/post-json?u=bdf87686b4cacf7c59f7f48c9&amp;id=0de3dd48a1&';
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  sendSubscription() {
    if (this.email && validateEmail(this.email)) {
      const params = new HttpParams()
        .set('EMAIL', this.email)
        .set('b_bdf87686b4cacf7c59f7f48c9_0de3dd48a1', '');
      const mailChimpUrl = this.mailChimpEndpoint + params.toString();
      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
      this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
        if (response.result && response.result !== 'error') {
          this.toastyService.success("¡Te has suscrito a nuestro newsletter!");
          this.router.navigate(['/']);
        }
        else {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions
          toast.msg = response.msg;
          this.toastyService.error(toast)
        }
      }, error => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions
        toast.msg = "Ha habido un error";
        this.toastyService.error(toast)
      });
    }
  }


}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
