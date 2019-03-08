import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from './../../_services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  private s: any;
  private s2: any;
  errorMsg: string;
  redirectUrl: string;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.s = this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];
      console.log(token, email)
      this.redirectUrl = params['redirecto'];
      if (token && email) {
        this.s2 = this.customerService.confirmAccount(email, token).subscribe(() => { }, err => {
          this.errorMsg = err;
        })
      } else {
        this.router.navigate(['/404']);
      }
    })
  }
  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
    if (this.s2) this.s2.unsubscribe();
  }

}
