import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOption } from 'ng-select';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { IProfesional } from '../../_models/Profesional';
import { ProfesionalService } from '../../_services/profesional.service';
import { ProvinciasService } from '../../_services/provincias.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-admin-profiles",
  templateUrl: "./admin-profiles.component.html",
  styleUrls: ["./admin-profiles.component.css"],
  providers: [ProvinciasService]
})
export class AdminProfilesComponent implements OnInit {
  abogados: IOption[] = [];
  abogado: IProfesional;

  constructor(
    private route: ActivatedRoute,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private profesionalService: ProfesionalService,
    private provinciasService: ProvinciasService,
    private router: Router,
    private sharedUserService: SharedUserService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}

  returnDate(date: string) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    return new Date(date).toLocaleDateString("es-ES", options);
  }

  private cloneOptionsFromSQL(options: Array<any>): Array<IOption> {
    return options.map(option => ({
      value: option.id,
      label: option.id + "-" + option.nombre + " " + option.apellidos
    }));
  }

  searchLawyerByApellidos(term: string) {
    this.profesionalService.findUsersByApellidos(term).subscribe(users => {
      this.abogados = this.cloneOptionsFromSQL(users);
    });
  }

  getProfile(selected) {
    this.profesionalService.findUserProfileAdmin(selected.value).subscribe(
      res => {
        this.abogado = res;
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }

  openModal(id: number) {
    this.router.navigate([], {
      queryParams: { abogado: id },
      relativeTo: this.route
    });
  }

  cambiarSignUp(id, verificacion) {
    this.profesionalService.updateEstadoSignUp(id, verificacion).subscribe(
      res => {
        this.abogado = res;
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }

  irProfile() {
    this.router.navigate(
      this.sharedUserService.getProfileUrl(this.abogado, false)
    );
  }
  irProfileOculto() {
    this.router.navigate(
      this.sharedUserService.getProfileUrl(this.abogado, true)
    );
  }
}
