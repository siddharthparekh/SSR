import { ISentencia, Sentencia } from './Sentencia';

export interface IInstancia {
  id: number
  nombre?: string,
  Sentencias: Array<ISentencia>
}

export class Instancia implements IInstancia {
  id: number
  nombre?: string
  Sentencias: Array<ISentencia>

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    if(o.Sentencias) this.Sentencias = o.Sentencias.map(s => new Sentencia(s));
  }
}
