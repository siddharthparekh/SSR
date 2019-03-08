
import {takeUntil} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './../../../_services/user.service';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  reqInProg = false;
  errorMsg = '';
  token: string;
  email: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.token = params['token'];
        this.email = params['email'];
      });
    if (!this.email || !this.token) {
      this.router.navigate(['/404']);
    }
  }
  onReset(value) {
    this.reqInProg = value;
    this.userService.resetPassword(this.token, this.email, this.resetPasswordForm.get('password').value).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.reqInProg = false;
        this.router.navigate(['result', true], { relativeTo: this.route });
      }, err => {
        this.reqInProg = false;
        this.router.navigate(['result', false], { relativeTo: this.route });
      });
  }
  createForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [duplicatePassword, Validators.required, Validators.minLength(6)]],
    });
  }
  setEmtpyPassConfirm() {
    if (this.resetPasswordForm.get('password_confirm').touched) {
      this.resetPasswordForm.patchValue({ password_confirm: '' });
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
function duplicatePassword(input: AbstractControl) {
  const password = input.value;
  const password_confirm = input.root.value.password;
  if (password !== password_confirm) {
    return { mismatchedPassword: true };
  } else {
    return null;
  }
}
