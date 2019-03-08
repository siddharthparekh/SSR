import { ISentencia, Sentencia } from './Sentencia';
import { IDistribucion, Distribucion } from './Distribucion';

export interface IOrden {
  id: number,
  nombre: string,
  Sentencias?: Array<ISentencia>,
  Distribuciones?: Array<IDistribucion>
}

export class Orden implements IOrden{
  id: number
  nombre: string
  Sentencias?: Array<ISentencia>
  Distribuciones?: Array<IDistribucion>

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    if (o.Sentencias) this.Sentencias = o.Sentencias.map(s => new Sentencia(o));
    if (o.Distribuciones) this.Distribuciones = o.Distribuciones.map(d => new Distribucion(d));
  }
}
