import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
   FormBuilder,
   FormGroup,
   Validators,
} from '@angular/forms'
import { ProfesionalService } from './../../../_services/profesional.service';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

declare var gtag: any;

@Component({
   selector: 'app-aca-update-credentials',
   templateUrl: './aca-update-credentials.component.html',
   styleUrls: ['./aca-update-credentials.component.css', '../../common.css'],
})
export class AcaUpdateCredentialsComponent implements OnInit {
   params: any
   updateForm: FormGroup
   rememberMe = false
   reqInProg = false;

   constructor(
      private profesionalService: ProfesionalService,
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
   ) { }

   ngOnInit() {
      this.params = this.route.snapshot.queryParams
      this.createForm();
      gtag('event', 'conversion', { 'send_to': 'AW-815292843/p55xCIuOnZMBEKvD4YQD' });
   }
   createForm() {
      this.updateForm = this.fb.group({
         email: [this.params.email, [Validators.email, Validators.required]],
         password: ['', [Validators.required]],
      })
   }
   signup() {
      this.reqInProg = true;
      let object = Object.assign({}, this.params);
      object.email = this.updateForm.value.email;
      object.password = this.updateForm.value.password;
      this.profesionalService
         .updateUser(object)
         .subscribe(res => {
            this.reqInProg = false;
            this.router.navigate(["/"]);
         }, err => {
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions
            toast.msg = err
            this.toastyService.error(toast)
         });
   }

   toggleRememberMe(e) {
      this.rememberMe = e.target.checked
   }
}
