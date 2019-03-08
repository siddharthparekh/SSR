import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidateCoherentDate } from '../../../../coherentDate.validator';
import { Subject, Observable } from 'rxjs';
import { CareerItem } from '../../interfaces';
import { takeUntil } from 'rxjs/operators';
import { environment } from './../../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
   selector: 'app-career-form',
   templateUrl: './career-form.component.html',
})
export class CareerFormComponent implements OnInit, OnDestroy {
   expForm: FormGroup;
   monthOptions = initMonthsOptions();
   yearsOptions = initYears();
   despachos: string = environment.api_url + "/despachos?nombre=:keyword";
   uniqueId = Math.random().toString(36).substr(2, 9);
   @Output() onValidityChange = new EventEmitter<boolean>();
   @Output() onDataChange = new EventEmitter<CareerItem>();
   @Input() onClean: Observable<void>;
   @Input() onInitialCareer: Subject<CareerItem>;


   ngUnsubscribe = new Subject<void>();

   constructor(
      private fb: FormBuilder,
      private _sanitizer: DomSanitizer
   ) {
      this.initForm();
   }
   ngOnInit() {
      this.expForm.valueChanges
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((value) => {
            value = this.changeDataFinActualidad(value.periodo_end_actualidad_exp);
            this.onDataChange.emit(parseCareer(value))
         });
      this.expForm.statusChanges
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(value => this.onValidityChange.emit(value == 'VALID'));
      this.onClean && this.onClean
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(() => this.initForm());
      this.onInitialCareer && this.onInitialCareer
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((career) => this.expForm.patchValue(parseToForm(career)));
   }
   initForm() {
      this.expForm = this.fb.group(
         {
            id: [""],
            empresa: this.fb.group({
               nombre: ["", [Validators.required]],
               id: [undefined, []],
               foto: [],
               presentation_text: []
            }),
            cargo: ["", [Validators.required]],
            descripcion: [""],
            fechaInicio: this.fb.group({
               month: ["", [Validators.required]],
               year: ["", [Validators.required]]
            }),
            fechaFin: this.fb.group({
               month: [""],
               year: [""]
            }),
            periodo_end_actualidad_exp: [""]
         },
         { validator: ValidateCoherentDate }
      );
   }
   onSelect(despacho) {
      if (typeof despacho === "object") {
         this.expForm.patchValue({
            empresa: {
               nombre: despacho.nombre,
               id: despacho.id,
               presentation_text: despacho.presentation_text,
               foto: despacho.foto
            }
         });
      } else {
         this.expForm.patchValue({ empresa: { id: null } });
      }
   }
   autocompleListFormatter = (data: any) => {
      let html;
      if (data.foto)
         html = `<span><img class="img-circle" src="assets/images/profiles/${
            data.foto
            }" style="width: 50px; height: 50px;"></img> ${data.nombre}</span>`;
      else
         html = `<span><img class="img-circle" src="assets/images/profiles/default.png" style="width: 50px; height: 50px;"></img> ${
            data.nombre
            }</span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
   };
   resultFormatter = (data: any) => {
      return data.nombre;
   };
   changeDataFinActualidad(isDateActual) {
      if (this.expForm) {
         if (isDateActual) {
            this.expForm.get("fechaFin").disable({ emitEvent: false });
         } else {
            this.expForm.get("fechaFin").enable({ emitEvent: false });
            this.expForm.patchValue(this.expForm.value, { emitEvent: false });
            console.log(this.expForm.value);
         }
      }
      return this.expForm.value;
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next(); this.ngUnsubscribe.complete();
   }
}
const initYears = (): number[] => {
   let years = [];
   let actualYear: number = new Date().getFullYear()
   for (let i = 0; i < 60; i++) {
      years[i] = actualYear;
      actualYear -= 1;
   }
   return years;
}
const initMonthsOptions = (): { value: number, label: string }[] => {
   return [
      { value: 1, label: "enero" },
      { value: 2, label: "febrero" },
      { value: 3, label: "marzo" },
      { value: 4, label: "abril" },
      { value: 5, label: "mayo" },
      { value: 6, label: "junio" },
      { value: 7, label: "julio" },
      { value: 8, label: "agosto" },
      { value: 9, label: "septiembre" },
      { value: 10, label: "octubre" },
      { value: 11, label: "noviembre" },
      { value: 12, label: "diciembre" },
   ]
}

const parseCareer = (rawForm): CareerItem => {
   const fechaFinExist = !rawForm.periodo_end_actualidad_exp && rawForm.fechaFin;
   const career: CareerItem = {
      id: rawForm.id,
      agency: {
         name: rawForm.empresa.nombre,
         id: rawForm.empresa.id,
         photo: rawForm.empresa.photo,
         adminLevel: null,
         summaryText: rawForm.empresa.presentation_text
      },
      post: rawForm.cargo,
      location: null,
      summaryText: rawForm.descripcion,
      from: new Date(rawForm.fechaInicio.year, rawForm.fechaInicio.month - 1),
      to: !!fechaFinExist ? new Date(rawForm.fechaFin.year, rawForm.fechaFin.month - 1) : null
   }
   return career;
}
const parseToForm = (career: CareerItem): any => {
   let careerForm: any = {
      id: career.id,
      empresa: {
         nombre: career.agency.name,
         id: career.agency.id
      },
      cargo: career.post,
      descripcion: career.summaryText,
      fechaInicio: {
         month: career.from.getMonth() + 1,
         year: career.from.getFullYear()
      },
      periodo_end_actualidad_exp: career.to ? false : true
   };
   if (career.to) careerForm.fechaFin = {
      month: career.to.getMonth() + 1,
      year: career.to.getFullYear()
   };
   return careerForm;
}