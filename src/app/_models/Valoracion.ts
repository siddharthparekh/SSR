import { IProfesional, Profesional } from './Profesional';
import { IRespuestaLegal, RespuestaLegal } from './RespuestaLegal';

export interface IValoracion {
  id: number;
  rating: number;
  opinion?: string;
  createdAt: Date;
  Profesional: IProfesional;
  RespuestaLegal: IRespuestaLegal
}

export class Valoracion {
  id: number;
  rating: number;
  opinion?: string;
  createdAt: Date;
  Profesional: IProfesional;
  RespuestaLegal: IRespuestaLegal

  constructor(o: any) {
    this.id = o.id;
    this.rating = o.rating;
    this.opinion = o.opinion
    this.createdAt = o.createdAt
    if (o.ProfesionaleId) this.Profesional = o.Profesionale ? new Profesional(o.Profesionale) : new Profesional({ id: o.RespuestaLegal });
    if (o.RespuestasLegaleId) this.RespuestaLegal = o.RespuestasLegale ? new RespuestaLegal(o.RespuestasLegale) : new RespuestaLegal({ id: o.RespuestasLegaleId });
  }
}
