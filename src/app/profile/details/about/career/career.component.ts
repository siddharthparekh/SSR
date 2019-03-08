import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { CareerItem, LawyerAgency } from '../interfaces';
import { Subject } from 'rxjs';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ProfesionalService } from '../../../../_services/profesional.service';
import { ToastOptionsClass } from '../../../../_utils/toastOptionsClass';
import { takeUntil } from 'rxjs/operators';
import { IDespacho } from '../../../../_models/Despacho';
import { OfficeService } from '../../../../_services/office.service';

@Component({
   selector: 'app-profile-career',
   templateUrl: './career.component.html',
   styleUrls: [
      '../../../styles/blockable.css',
   ],
   providers: [OfficeService, ProfesionalService]
})
export class CareerComponent implements OnDestroy {
   @Input() items: CareerItem[];
   @Input() agencies: LawyerAgency[];
   @Input() itIsMe: boolean;
   @Output() onAgenciesChange = new EventEmitter<LawyerAgency[]>();
   reqInProg = false;
   resetForm = new Subject<void>();
   onSelectItem = new Subject<CareerItem>();
   ngUnsubscribe = new Subject<void>();

   constructor(
      private profesionalService: ProfesionalService,
      private toastService: ToastyService,
      private toastOptionsClass: ToastOptionsClass,
      private officeService: OfficeService
   ) {

   }

   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }

   onSelect(career: CareerItem) {
      this.onSelectItem.next(career);
   }

   updateItemInMemory(form: CareerItem) {
      const i = this.items.findIndex(item => item.id == form.id);
      if (i < 0) throw new Error("No se encontro la formación ya actualizada");
      this.items[i] = form;
   }
   error(err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.msg = err;
      this.toastService.error(toast);
      this.closeModal();
      this.closeModalCreate();
      this.reqInProg = false;
   }

   editCareer(career: CareerItem) {
      this.reqInProg = true;
      const careerOld = this.items.find(item => item.id == career.id);
      const agencyOldIndex = this.agencies.findIndex(agency => agency.id == careerOld.agency.id);
      const isAdminOfficeOld = agencyOldIndex > -1 && this.agencies[agencyOldIndex].adminLevel == 2;
      const agency = this.agencies.find(agency => agency.id == career.agency.id);
      const isAdminOffice = agency && agency.adminLevel == 2;
      console.log(career);
      // unirse a un despacho ao que antes non formaba parte
      if (
         career.agency.id &&
         !career.to &&
         (
            career.to != careerOld.to || !career.agency.id || isAdminOfficeOld
         ) &&
         !isAdminOffice
      ) {
         this.officeService
            .joinOffice(career.agency.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               office => {
                  this.profesionalService
                     .updateExperience(career)
                     .pipe(takeUntil(this.ngUnsubscribe))
                     .subscribe(
                        exp => {
                           career.agency.adminLevel = 0;
                           this.agencies.push(career.agency);
                           this.onAgenciesChange.emit(this.agencies);
                           this.reqInProg = false;
                           this.closeModal();
                           this.updateItemInMemory(career);
                        },
                        err => {
                           this.error(err);
                        }
                     );
               },
               err => {
                  this.error(err);
               }
            );
      }
      //marcharse dun despacho do que antes formaba parte
      else if (
         ((career.to &&
            (careerOld.agency.id) &&
            (!!career.to) != (!!careerOld.to)) ||
            ((!career.agency.id ||
               isAdminOffice) &&
               (careerOld.agency.id) &&
               !careerOld)) &&
         !isAdminOfficeOld
      ) {
         this.officeService
            .exitOffice(careerOld.agency.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               () => {
                  this.profesionalService
                     .updateExperience(career)
                     .pipe(takeUntil(this.ngUnsubscribe))
                     .subscribe(
                        exp => {
                           this.agencies.splice(agencyOldIndex, 1);
                           this.onAgenciesChange.emit(this.agencies);
                           this.reqInProg = false;
                           this.closeModal();
                           this.updateItemInMemory(career);
                        },
                        err => {
                           this.error(err);
                        }
                     );
               },
               err => {
                  this.error(err);
               }
            );
      }
      //cambiar un despacho por outro
      else if (
         career.agency.id &&
         (careerOld.agency.id) &&
         careerOld.agency.id != career.agency.id &&
         !career.to &&
         !isAdminOffice &&
         !isAdminOfficeOld
      ) {
         this.officeService
            .exitOffice(careerOld.agency.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               () => {
                  this.officeService
                     .joinOffice(career.agency.id)
                     .pipe(takeUntil(this.ngUnsubscribe))
                     .subscribe(
                        office => {
                           this.profesionalService
                              .updateExperience(career)
                              .pipe(takeUntil(this.ngUnsubscribe))
                              .subscribe(
                                 exp => {
                                    career.agency.adminLevel = 0;
                                    this.agencies[agencyOldIndex] = career.agency;
                                    this.onAgenciesChange.emit(this.agencies);
                                    this.reqInProg = false;
                                    this.closeModal();
                                    this.updateItemInMemory(career);
                                 },
                                 err => {
                                    this.error(err);
                                 }
                              );
                        },
                        err => {
                           this.error(err);
                        }
                     );
               },
               err => {
                  this.error(err);
               }
            );
      } else {
         this.profesionalService
            .updateExperience(career)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               exp => {
                  this.reqInProg = false;
                  this.closeModal();
                  this.updateItemInMemory(career);
               },
               err => {
                  this.error(err);
               }
            );
      }
   }

   closeModal() {
      //@ts-ignore
      $("#edit-experience").modal("hide");
   }
   closeModalCreate() {
      //@ts-ignore
      $("#new-experience").modal("hide");
   }

   newExperience(career: CareerItem) {
      if (
         (!career.to || career.to)
      ) {
         this.reqInProg = true;
         let isAdminOffice = false;
         let despachoProfesional = this.items.find(e => e.agency.id == career.agency.id);
         if (despachoProfesional)
            isAdminOffice = false;
         if (!isAdminOffice && career.agency.id && !career.to) {
            this.profesionalService
               .createExperience(career)
               .pipe(takeUntil(this.ngUnsubscribe))
               .subscribe(
                  exp => {
                     this.officeService
                        .joinOffice(career.agency.id)
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe(
                           office => {
                              this.items.push(career);
                              career.agency.adminLevel = 0;
                              this.agencies.push(career.agency);
                              this.onAgenciesChange.emit(this.agencies);
                              this.reqInProg = false;
                              this.closeModalCreate();
                              this.updateItemInMemory(career);
                           },
                           err => {
                              this.error(err);
                           }
                        );
                     this.resetForm.next();
                  },
                  err => {
                     this.error(err);
                     this.resetForm.next();
                  }
               );
         } else {
            this.profesionalService
               .createExperience(career)
               .pipe(takeUntil(this.ngUnsubscribe))
               .subscribe(
                  exp => {
                     this.items.push(exp);
                     this.updateItemInMemory(career);
                     this.reqInProg = false;
                     this.closeModalCreate();
                  },
                  err => {
                     this.error(err);
                  }
               );
            this.resetForm.next();
         }
      }
   }
   selectItem(item) {
      this.onSelectItem.next(item);
   }
}
