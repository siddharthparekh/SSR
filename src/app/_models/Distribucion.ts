import { IDerecho, Derecho } from './Derecho';
import { IProfesional, Profesional } from './Profesional';
import { IOrden, Orden } from './Orden';

export interface IDistribucion {
  id: number
  porcentajeDistribucion: number,
  numeroResoluciones: number,
  Derecho: IDerecho,
  Profesional: IProfesional,
  Orden: IOrden
}

export class Distribucion {
  id: number
  porcentajeDistribucion: number
  numeroResoluciones: number
  Derecho: IDerecho
  Profesional: IProfesional
  Orden: IOrden
  constructor(o: any) {
    this.id = o.id;
    this.porcentajeDistribucion = o.porcentajeDistribucion;
    this.numeroResoluciones = o.numeroResoluciones;
    this.Derecho = new Derecho({ id: o.DerechoId });
    this.Profesional = new Profesional({ id: o.ProfesionaleId });
    this.Orden = new Orden({ id: o.OrdeneId });
  }
}
