import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ProfesionalService } from '../../_services/profesional.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-admin-usuarios",
  templateUrl: "./admin-usuarios.component.html",
  styleUrls: ["./admin-usuarios.component.css"]
})
export class AdminUsuariosComponent implements OnInit {
  users;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private profesionalService: ProfesionalService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.profesionalService.getRegistrados().subscribe(
      res => {
        this.users = res;
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
}
