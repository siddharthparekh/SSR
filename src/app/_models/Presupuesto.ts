import { IRespuestaLegal, RespuestaLegal } from './RespuestaLegal';

export interface IPresupuesto {
  id: number;
  resumen: string;
  trabajos: string;
  honorarios: string;
  formaPago: string;
  importe: number;
  importeTotal: number;
  porcentajeIntermediario: number;
  RespuestaLegal: IRespuestaLegal;
}
export class Presupuesto implements IPresupuesto {
  id: number;
  resumen: string;
  trabajos: string;
  honorarios: string;
  formaPago: string;
  importe: number;
  importeTotal: number;
  porcentajeIntermediario: number;
  RespuestaLegal: IRespuestaLegal;

  constructor(o) {
    this.id = o.id;
    this.resumen = o.resumen;
    this.trabajos = o.trabajos;
    this.honorarios = o.honorarios;
    this.formaPago = o.formaPag;
    this.importe = o.importe;
    this.importeTotal = o.importeTotal;
    this.porcentajeIntermediario = o.porcentajeIntermediario;
    if(o.RespuestasLegaleId) this.RespuestaLegal = o.RespuestasLegale ? new RespuestaLegal(o.RespuestasLegale) : new RespuestaLegal({ id: o.RespuestasLegaleId });
  }
}
