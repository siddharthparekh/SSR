import { IFallo, Fallo } from './Fallo';
import { ISentencia, Sentencia } from './Sentencia';

export interface ITipoFallo {
  id: number
  nombre: string
  Fallos: Array<IFallo>
  Sentencias: Array<ISentencia>
}

export class TipoFallo implements ITipoFallo{
  id: number
  nombre: string
  Fallos: Array<IFallo>
  Sentencias: Array<ISentencia>

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    if (o.Fallos) this.Fallos = o.Fallos.map(f => new Fallo(f));
    if (o.Sentencias) this.Sentencias = o.Sentencias.map(s => new Sentencia(s));
  }
}
