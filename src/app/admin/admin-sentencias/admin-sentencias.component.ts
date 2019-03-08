import { Component, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ProfesionalService } from '../../_services/profesional.service';
import { SentenceService } from '../../_services/sentence.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-admin-sentencias",
  templateUrl: "./admin-sentencias.component.html",
  styleUrls: ["./admin-sentencias.component.css"]
})
export class AdminSentenciasComponent implements OnInit {
  abogados: IOption[] = [];
  sentences;

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private sentenceService: SentenceService,
    private profesionalService: ProfesionalService
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
      label: option.nombre + " " + option.apellidos
    }));
  }

  searchLawyer(term: string) {
    if (term)
      if (term.length < 4) this.abogados = [];
      else
        this.profesionalService.findUsersByApellidos(term).subscribe(users => {
          this.abogados = this.cloneOptionsFromSQL(users);
        });
  }

  getSentencias(abogado) {
    this.sentenceService.getSentences(abogado.value).subscribe(
      res => {
        this.sentences = res;
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }

  eliminarSentencia(id) {
    this.sentenceService.deleteSentence(id).subscribe(
      res => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = "Sentencia eliminada";
        toast.title = "COMPLETADO";
        this.toastyService.success(toast);
        let index = this.sentences
          .map(val => {
            return val.id;
          })
          .indexOf(id);
        this.sentences.splice(index, 1);
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }
}
