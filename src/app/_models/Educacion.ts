import { IProfesional, Profesional } from './Profesional';

export interface IEducacion {
  id: number
  institucion: string,
  titulacion: string,
  diplomas?: string,
  periodo_start?: Date,
  periodo_end?: Date,
  Profesional: IProfesional
}

export class Educacion implements IEducacion{
  id: number
  institucion: string
  titulacion: string
  diplomas?: string
  periodo_start?: Date
  periodo_end?: Date
  Profesional: IProfesional

  constructor(o: any) {
    this.id = o.id;
    this.institucion = o.institucion;
    this.titulacion = o.titulacion;
    this.diplomas = o.diplomas;
    this.periodo_start = o.periodo_start;
    this.periodo_end = o.periodo_end;
    this.Profesional = new Profesional({id: o.ProfesionaleId});
  }
}
