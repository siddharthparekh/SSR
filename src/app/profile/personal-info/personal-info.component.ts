import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { of as observableOf, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { IProfesional } from '../../_models/Profesional';
import { ProfesionalService } from '../../_services/profesional.service';
import { ProvinciasService } from '../../_services/provincias.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { UserService } from '../../_services/user.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';

declare var $: any;

@Component({
   selector: "app-personal-info",
   templateUrl: "./personal-info.component.html",
   styleUrls: ["./personal-info.component.css"]
})
export class PersonalInfoComponent implements OnInit {
   userForm: FormGroup;
   passwordForm: FormGroup;
   foto: any;
   reqInProg = false;
   reqInProgPass = false;
   errorMsg = "";
   editing = [];
   private ngUnsubscribe: Subject<void> = new Subject<void>();
   provincias: Array<Select2OptionData> = [];
   provinciaIdInicial: string;
   provinciaIdInicialFacturacion: string;
   imgHtml: any;
   user: any;
   formulario: any;
   checked;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private userService: UserService,
      private profesionalService: ProfesionalService,
      private sharedUserService: SharedUserService,
      private provinciasService: ProvinciasService,
      private fb: FormBuilder
   ) {
      this.createForm();
      this.toastyConfig.theme = "default";
   }

   ngOnInit() {
      if (this.sharedUserService.getUserTipo() == 1) {
         this.user = this.sharedUserService.getUser();
         this.userForm.patchValue(this.user);
         this.foto = this.user.foto;
      } else {
         this.profesionalService
            .findFullUserProfile(this.sharedUserService.getUserId())
            .subscribe(user => {
               this.user = user;
               this.user.provincia = user.Estadisticas.provincia;
               this.userForm.patchValue(this.user);
               this.foto = user.foto;
               this.provincias = this.provinciasService.getProvincias();
               let provinciaSelect2 = this.provinciasService.getProvinciaByName(
                  user.Estadisticas.provincia
               );
               console.log(provinciaSelect2);
               if (provinciaSelect2) this.provinciaIdInicial = provinciaSelect2.id;
            });
      }
   }

   onProvinciaSelect(val: number) {
      let provincia: string = null;
      if (val != 0) provincia = this.provinciasService.getProvincia(val).text;
      this.userForm.patchValue({ provincia: provincia });
   }
   onProvinciaSelectFacturacion(val: number) {
      let provincia: string = null;
      if (val != 0) provincia = this.provinciasService.getProvincia(val).text;
      this.formulario.provincia = provincia;
   }

   createForm() {
      this.userForm = this.fb.group({
         email: [undefined, [Validators.email], this.emailExist.bind(this)],
         telefono: ["", [Validators.pattern("[0-9]{9}")]],
         nombre: [undefined, [Validators.required]],
         apellidos: [undefined],
         localidad: [undefined],
         provincia: [undefined],
         domicilio: [undefined]
      });
      this.passwordForm = this.fb.group({
         password: ["", [Validators.required, Validators.minLength(6)]],
         passwordNueva: ["", [Validators.required, Validators.minLength(6)]],
         passwordConfirm: [
            "",
            [Validators.required, duplicatePassword, Validators.minLength(6)]
         ]
      });
   }
   onUpdateProfesional() {
      if (this.userForm.valid) {
         this.reqInProg = true;
         this.profesionalService
            .updateUser(this.userForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               () => {
                  this.reqInProg = false;
                  this.usertoLocalStorage(this.userForm.value);
                  this.success();
                  this.editing["section1"] = false;
               },
               err => {
                  this.reqInProg = false;
                  this.fail(err);
               }
            );
      }
   }
   fileChangeListener(foto: File) {
      var imageHtml: any = new Image();
      var file: File = foto;
      var myReader: FileReader = new FileReader();
      var that = this;
      myReader.onloadend = (loadEvent: any) => {
         imageHtml.src = loadEvent.target.result;
         this.imgHtml = imageHtml;
         $("#modal-cropper").modal("show");
      };
      myReader.readAsDataURL(file);
   }
   onUpdateUser() {
      if (this.userForm.valid) {
         this.reqInProg = true;
         this.userService
            .updateUserCredentials(this.userForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               () => {
                  this.reqInProg = false;
                  let user = this.sharedUserService.getUser();
                  this.sharedUserService.setUsuario(Object.assign({}, user, this.userForm.value));
                  this.success();
                  this.editing["section1"] = false;
               },
               err => {
                  this.reqInProg = false;
                  this.fail(err);
               }
            );
      }
   }
   uploadPhoto(foto: File) {
      this.reqInProg = true;
      this.userService.uploadPhoto(foto).subscribe(
         user => {
            this.reqInProg = false;
            this.foto = user.foto;
            let u: IProfesional = this.sharedUserService.getUser();
            u.foto = this.foto;
            this.sharedUserService.setUsuario(u);
         },
         err => {
            this.reqInProg = false;
            this.fail(err);
         }
      );
   }
   emailExist(control: AbstractControl) {
      if (control.value !== this.sharedUserService.getUser().email) {
         return this.userService.emailExist(control.value).pipe(
            map(res => {
               return !res ? null : { emailExist: true };
            })
         );
      } else {
         return observableOf(null);
      }
   }
   updateUser(value) {
      if (this.user.tipo != 1) {
         this.onUpdateProfesional();
      } else {
         this.onUpdateUser();
      }
   }
   updatePassword(value) {
      if (this.passwordForm.valid) {
         this.reqInProgPass = value;
         this.userService
            .updatePassword(this.passwordForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               (res) => {
                  this.reqInProgPass = false;
                  this.success();
                  this.editing["password"] = false;
                  this.passwordForm.reset();
               },
               err => {
                  this.reqInProgPass = false;
                  this.fail(err);
               }
            );
      }
   }
   setEmtpyPassConfirm() {
      if (this.passwordForm.get("passwordConfirm").touched) {
         this.passwordForm.patchValue({ passwordConfirm: "" });
      }
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }

   success() {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.title = "COMPLETADO";
      toast.msg = "Datos actualizados";
      this.toastyService.success(toast);
   }
   fail(err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.title = "ERROR";
      toast.msg = err;
      this.toastyService.error(toast);
   }
   usertoLocalStorage(userValues) {
      let user = this.sharedUserService.getUser();
      user.nombre = userValues.nombre;
      user.apellidos = userValues.apellidos;
      user.email = userValues.email;
      user.telefono = userValues.telefono;
      user.localidad = userValues.localidad;
      user.Estadisticas.provincia = userValues.provincia;
      this.sharedUserService.setUsuario(user);
   }
}

function duplicatePassword(input: AbstractControl) {
   const password = input.value;
   if (password) {
      const password_confirm = input.root.value.passwordNueva;
      if (password !== password_confirm) {
         return { mismatchedPassword: true };
      } else {
         return null;
      }
   }
}

function checkCurrentPassword(currentpassword: string): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } | null => {
      const result = control.value === currentpassword;
      return !result ? { currentPassword: true } : null;
   };
}