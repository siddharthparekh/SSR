import { IProfesional, Profesional } from './Profesional';
import { IDespacho, Despacho } from './Despacho';
import {Rol} from './Rol';

export interface IExperiencia {
  id: number
  cargo: string
  empresa: string
  foto: string
  ubicacion?: string
  descripcion?: string
  periodo_start: Date
  periodo_end?: Date
  Profesional: IProfesional
  Despacho?: IDespacho
}

export class Experiencia implements IExperiencia{
  id: number
  cargo: string
  empresa: string
  foto: string
  ubicacion?: string
  descripcion?: string
  periodo_start: Date
  periodo_end?: Date
  Profesional: IProfesional
  Despacho: IDespacho


  constructor(o: any) {
    this.id = o.id;
    this.cargo = o.cargo;
    this.empresa = o.empresa;
    this.foto = o.foto;
    this.ubicacion = o.ubicacion;
    this.descripcion = o.descripcion;
    this.periodo_start = o.periodo_start;
    this.periodo_end = o.periodo_end;
    this.Profesional = new Profesional({ id: o.ProfesionaleId });
    if (o.DespachoId) this.Despacho = new Despacho({ id: o.DespachoId });
  }

  getDespacho() {
    return this.Despacho;
  }
}
