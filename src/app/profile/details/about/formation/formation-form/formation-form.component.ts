import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidateCoherentDate } from '../../../../coherentDate.validator';
import { Subject, Observable } from 'rxjs';
import { FormationItem } from '../../interfaces';
import { takeUntil } from 'rxjs/operators';

@Component({
   selector: 'app-formation-form',
   templateUrl: './formation-form.component.html',
})
export class FormationForm implements OnInit, OnDestroy {
   eduForm: FormGroup;
   monthOptions = initMonthsOptions();
   yearsOptions = initYears();
   uniqueId = Math.random().toString(36).substr(2, 9);
   @Output() onValidityChange = new EventEmitter<boolean>();
   @Output() onDataChange = new EventEmitter<FormationItem>();
   @Input() onClean: Observable<void>;
   @Input() onInitialFormation: Subject<FormationItem>;


   ngUnsubscribe = new Subject<void>();

   constructor(
      private fb: FormBuilder,
   ) {
      this.initForm();
   }
   ngOnInit() {
      this.eduForm.valueChanges
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((value) => {
            value = this.changeDataFinActualidad(value.periodo_end_actualidad_edu)
            this.onDataChange.emit(parseFormation(value))
         });
      this.eduForm.statusChanges
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(value => this.onValidityChange.emit(value == 'VALID'));
      this.onClean && this.onClean
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(() => this.initForm());
      this.onInitialFormation && this.onInitialFormation
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((formation) => this.eduForm.patchValue(parseToForm(formation)));
   }
   initForm() {
      this.eduForm = this.fb.group(
         {
            id: [""],
            titulacion: ["", [Validators.required]],
            institucion: ["", [Validators.required]],
            fechaInicio: this.fb.group({
               month: [""],
               year: [""]
            }),
            fechaFin: this.fb.group({
               month: [""],
               year: [""]
            }),
            periodo_end_actualidad_edu: [undefined, []]
         },
         { validator: ValidateCoherentDate });
   }
   changeDataFinActualidad(isDateActual) {
      if (!this.eduForm) return;
      if (isDateActual) {
         this.eduForm.get("fechaFin").disable({ emitEvent: false });
      } else {
         // { fechaFin: { month: "", year: "" } }
         this.eduForm.patchValue(this.eduForm.value, { emitEvent: false });
         this.eduForm.get("fechaFin").enable({ emitEvent: false });
      }
      return this.eduForm.value;
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

const parseFormation = (rawForm): FormationItem => {
   const fechaFinExist = !rawForm.periodo_end_actualidad_edu && rawForm.fechaFin;
   return {
      id: rawForm.id,
      certification: rawForm.titulacion,
      institution: rawForm.institucion,
      from: new Date(rawForm.fechaInicio.year, rawForm.fechaInicio.month - 1),
      to: fechaFinExist ? new Date(rawForm.fechaFin.year, rawForm.fechaFin.month - 1) : null
   }
}
const parseToForm = (formation: FormationItem): any => {
   let formationForm: any = {
      id: formation.id,
      titulacion: formation.certification,
      institucion: formation.institution,
      fechaInicio: {
         month: formation.from.getMonth() + 1,
         year: formation.from.getFullYear()
      },
      periodo_end_actualidad_edu: formation.to ? false : true
   }
   if (formation.to) formationForm.fechaFin = {
      month: formation.to.getMonth() + 1,
      year: formation.to.getFullYear()
   }
   return formationForm;
}