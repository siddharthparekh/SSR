import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedUserService } from './../../_services/shared-user.service';
import { Router } from '@angular/router';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() url: string;
  @Input() isAbogado: boolean = false;
  @Input() leftfooter: boolean = false;
  userType: number;
  s: any;
  isLogged = false;
  email = null;

  constructor(private sharedUserService: SharedUserService, private router: Router,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService) { }

  ngOnInit() {
    this.s = this.sharedUserService.isLogged$.subscribe(isLogged => {
      if (isLogged) {
        this.userType = this.sharedUserService.getUserTipo();
        this.isLogged = true;
      } else {
        this.userType = null;
      }
    });
    if (this.sharedUserService.isLoggedIn()) {
      this.isLogged = true;
      this.userType = this.sharedUserService.getUserTipo();
    }
    else this.userType = null;
  }
  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
  }

  confirmSubscription() {
    if (this.email && validateEmail(this.email)) this.router.navigate(['/newsletter'], { queryParams: { email: this.email } });
    else {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions
      toast.msg = "El correo electrónico no es válido";
      this.toastyService.error(toast)
    }
  }

}


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}