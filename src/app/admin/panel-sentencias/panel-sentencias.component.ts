import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IOption } from 'ng-select';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrdenService } from '../../_services/orden.service';
import { ProfesionalService } from '../../_services/profesional.service';
import { RightService } from '../../_services/right.service';
import { SentenceService } from '../../_services/sentence.service';
import { SolrService } from '../../_services/solr.service';
import { TiposService } from '../../_services/tipos.service';
import { IRol } from './../../_models/Rol';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-panel-sentencias",
  templateUrl: "./panel-sentencias.component.html",
  styleUrls: ["./panel-sentencias.component.css"],
  providers: [
    SolrService,
    RightService,
    ProfesionalService,
    OrdenService,
    SentenceService,
    TiposService
  ]
})
export class PanelSentenciasComponent implements OnInit {
  abogados: IOption[][] = [[]];
  derechos: Array<IOption> = [];
  ordenes: Array<any> = [];
  fallos: Array<any> = [];
  roles: Array<IRol> = [];
  salas: Array<any> = [];
  partidos: any = {};
  instancias: Array<any> = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  formSentencia: FormGroup;
  reqInProg: boolean = false;
  contador_fallos: number = 0;

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private profesionalService: ProfesionalService,
    private ordenService: OrdenService,
    private rightService: RightService,
    private tiposService: TiposService,
    private sentenceService: SentenceService,
    private solrService: SolrService,
    private fb: FormBuilder
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.createForm();
    this.rightService
      .findDerechos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(derechos => {
        this.derechos = this.cloneOptionsRights(derechos);
      });
    this.ordenService
      .findOrdenes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(ordenes => {
        ordenes.forEach(orden => (orden.nombre = orden.nombre.toUpperCase()));
        this.ordenes = ordenes;
      });
    this.tiposService
      .getTipos("fallo")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(fallos => {
        this.fallos = fallos;
        this.fallos.forEach(f => {
          f = this.cleanString(f);
        });
      });
    this.tiposService
      .getTipos("instancia")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(instancias => {
        this.instancias = instancias;
      });
    this.tiposService
      .getPartidosJudiciales()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(partidos => {
        this.partidos = partidos;
      });
    this.tiposService
      .getTipos("rol")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(roles => {
        this.roles = roles;
      });
    this.tiposService
      .getTipos("sala")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(salas => {
        this.salas = salas;
      });
  }
  cleanString(f) {
    if (f && typeof f == "string") {
      let fallo = f.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return fallo.toUpperCase();
    }
    return undefined;
  }
  translateRol(rol) {
    rol = this.cleanString(rol);
    switch (rol) {
      case "PROSECUTOR":
        return "DEMANDANTE";
      case "DEFENDER":
        return "DEMANDADO";
      default:
        return undefined;
    }
  }
  sendTextToStructure(value: string) {
    let o: any = {}; /** ISentencia */
    o.abogados = [];
    o.fallos = [];
    let i = 0;
    this.solrService.getStructuredSentece(value).subscribe(
      res => {
        res.forEach(obj => {
          if (obj.name == "Lawyer") {
            let positionId: number;
            let position: IRol = this.roles.find(
              r => r.nombre == this.translateRol(obj.feats.role)
            );
            if (position) positionId = position.id;
            let a = {
              idSolr: obj.feats.id,
              posicion: positionId,
              nombre: obj.feats.name
            };
            o.abogados.push(a);
            this.addAbogado();
            i++;
          } else {
            o[obj.name] = obj;
          }
        });
        // this.abogados = this.cloneOptions(o.abogados);
        //Ver como veñen as variables para que todo vaia ben
        if (o.GlobalAttribs) {
          o.tipoResolucion = o.GlobalAttribs.feats.rulingType;
          o.orden = o.GlobalAttribs.feats.jurisdiction;
        }
        if (o.Court) o.juzgado = o.Court.feats.courtType;
        if (o.CourtLocation)
          o.localizacionPartidoJudicial = o.CourtLocation.text;
        if (o.Court) {
          o.sala = o.Court.feats.room;
          o.numeroSeccion = o.Court.feats.section
            ? o.Court.feats.section
            : o.Court.feats.number;
        }
        if (o.CaseNumber)
          o.numeroResolucion =
            o.CaseNumber.feats.number + "/" + o.CaseNumber.feats.year;
        if (o.RulingNumber)
          o.numeroSentencia =
            o.RulingNumber.feats.number + "/" + o.RulingNumber.feats.year;
        if (o.RulingDate) {
          o.fecha = moment.utc(
            `${o.RulingDate.feats.year}-${o.RulingDate.feats.month}-${
              o.RulingDate.feats.day
            }`,
            "YYYY-MM-DD"
          );
          o.fecha = o.fecha.format("YYYY-MM-DD");
        }
        if (o.DecisionHeading && o.DecisionHeading.feats.decision) {
          o.fallos.push({
            nombre: this.cleanString(o.DecisionHeading.feats.decision)
          });
        }
        this.formSentencia.patchValue(o);
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = "Error obteniendo datos estructurados de la sentencia";
        this.toastyService.error(toast);
      }
    );
  }
  createForm() {
    this.formSentencia = this.fb.group({
      ecli: [undefined],
      numeroResolucion: [undefined],
      fecha: [undefined],
      tipoResolucion: [undefined],
      numeroSentencia: [undefined],
      juzgado: [undefined],
      localizacionPartidoJudicial: [undefined],
      numeroSeccion: [undefined],
      sala: [undefined],
      ecliCor: [undefined],
      numeroResolucionCor: [undefined],
      fechaCor: [undefined],
      tipoResolucionCor: [undefined],
      numeroSentenciaCor: [undefined],
      juzgadoCor: [undefined],
      localizacionPartidoJudicialCor: [undefined],
      numeroSeccionCor: [undefined],
      salaCor: [undefined],
      abogados: this.fb.array([]),
      derechos: this.fb.array([this.initDerechos()]),
      fallos: this.fb.array([this.initFallos()]),
      orden: [undefined],
      ordenCor: [undefined],
      instancia: [undefined]
    });
  }
  initDerechos(): FormGroup {
    return this.fb.group({
      id: ["", [Validators.required]]
    });
  }
  initFallos(): FormGroup {
    return this.fb.group({
      id: [this.contador_fallos++],
      nombre: [undefined],
      nombreCor: [undefined]
    });
  }
  initAbogados() {
    return this.fb.group({
      idSolr: [undefined],
      posicion: [undefined],
      idSolrCor: [undefined],
      posicionCor: [undefined],
      falloId: [undefined],
      nombre: [undefined]
    });
  }
  addAbogado() {
    const control = <FormArray>this.formSentencia.controls["abogados"];
    control.push(this.initAbogados());
  }
  removeAbogado(i: number) {
    const control = <FormArray>this.formSentencia.controls["abogados"];
    control.removeAt(i);
  }
  addDerecho() {
    const control = <FormArray>this.formSentencia.controls["derechos"];
    control.push(this.initDerechos());
  }
  removeDerecho(i: number) {
    const control = <FormArray>this.formSentencia.controls["derechos"];
    control.removeAt(i);
  }
  addFallo() {
    const control = <FormArray>this.formSentencia.controls["fallos"];
    control.push(this.initFallos());
  }
  removeFallo(i: number) {
    const control = <FormArray>this.formSentencia.controls["fallos"];
    control.removeAt(i);
  }

  checkFields(): boolean {
    let form = this.formSentencia.value;
    var toast: ToastOptions = this.toastOptionsClass.toastOptions;
    if (!form.fecha && !form.fechaCor) {
      toast.msg = "Fecha incompleta";
      this.toastyService.error(toast);
      return false;
    } else if (!form.tipoResolucion && !form.tipoResolucionCor) {
      toast.msg = "Tipo de resolución incompleta";
      this.toastyService.error(toast);
      return false;
    } else if (!form.numeroSentencia && !form.numeroSentenciaCor) {
      toast.msg = "Número de Sentencia incompleto";
      this.toastyService.error(toast);
      return false;
    } else if (!form.juzgado && !form.juzgadoCor) {
      toast.msg = "Juzgado incompleto";
      this.toastyService.error(toast);
      return false;
    } else if (
      !form.localizacionPartidoJudicial &&
      !form.localizacionPartidoJudicialCor
    ) {
      toast.msg = "Partido judicial incompleto";
      this.toastyService.error(toast);
      return false;
    } else if (!form.orden && !form.ordenCor) {
      toast.msg = "Orden incompleta";
      this.toastyService.error(toast);
      return false;
    } else if (!form.instancia) {
      toast.msg = "Instancia incompleta";
      this.toastyService.error(toast);
      return false;
    } else {
      for (let index = 0; index < form.abogados.length; index++) {
        if (!form.abogados[index].idSolr && !form.abogados[index].idSolrCor) {
          toast.msg = "Abogado " + (index + 1) + " incompleto";
          this.toastyService.error(toast);
          return false;
        } else if (
          !form.abogados[index].posicion &&
          !form.abogados[index].posicionCor
        ) {
          toast.msg = "Rol del abogado " + (index + 1) + " incompleto";
          this.toastyService.error(toast);
          return false;
        }
      }
      for (let index = 0; index < form.fallos.length; index++) {
        if (!form.fallos[index].nombre && !form.fallos[index].nombreCor) {
          toast.msg = "Fallo " + (index + 1) + " incompleto";
          this.toastyService.error(toast);
          return false;
        }
      }
      return true;
    }
  }

  formatAbogados = (o: any[]) => {
    let r = o
      .reduce(function(res, currentValue) {
        currentValue.idSolrCor = !currentValue.idSolrCor
          ? currentValue.idSolr
          : currentValue.idSolrCor;
        if (res.indexOf(currentValue.idSolrCor) === -1) {
          res.push(currentValue.idSolrCor);
        }
        return res;
      }, [])
      .map(function(group) {
        return {
          idSolrCor: group,
          idSolr: o
            .filter(_el => {
              return _el.idSolrCor === group;
            })
            .map(_el => _el.idSolr)[0],
          fallos: o
            .filter(function(_el) {
              return _el.idSolrCor === group;
            })
            .map(function(_el) {
              return {
                posicion: _el.posicion,
                posicionCor: _el.posicionCor,
                falloId: _el.falloId
              };
            })
        };
      });
    return r;
  };
  sendSentence(value: boolean) {
    this.reqInProg = value;
    if (!this.checkFields()) {
      this.reqInProg = false;
    } else {
      let abogados = this.formatAbogados(this.formSentencia.value.abogados);
      let formValues = Object.assign({}, this.formSentencia.value);
      formValues.abogados = abogados;
      this.sentenceService
        .addSentence(formValues)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          res => {
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "COMPLETADO";
            toast.msg = "Sentencia enviada con éxito";
            this.toastyService.success(toast);
          },
          err => {
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastyService.error(toast);
          }
        );
    }
  }
  searchLawyer(term: string, i) {
    if (term)
      if (term.length < 4) this.abogados[i] = [];
      else
        this.profesionalService
          .findUsersByApellidos(term)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(users => {
            this.abogados[i] = this.cloneOptionsFromSQL(users);
          });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  private cloneOptions(options: Array<any>): Array<IOption> {
    return options.map(option => ({
      value: option.idSolr,
      label: option.nombre
    }));
  }
  private cloneOptionsFromSQL(options: Array<any>): Array<IOption> {
    return options.map(option => ({
      value: option.idSolr,
      label: option.nombre + " " + option.apellidos
    }));
  }
  private cloneOptionsRights(options: Array<any>): Array<IOption> {
    return options.map(option => ({
      value: option.id,
      label: option.nombre
    }));
  }
}
