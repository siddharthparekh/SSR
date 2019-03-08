import {ISentencia, Sentencia} from './Sentencia';

export interface IPartidoJudicial {
  id: number;
  nombre: string,
  localizacion?: string,
  Sentencias?: Array<ISentencia>
}

export class PartidoJudicial {
  id: number;
  nombre: string;
  localizacion?: string;
  Sentencias?: Array<ISentencia>;

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    this.localizacion = o.localizacion;
    if(o.Sentencias) this.Sentencias = o.Sentencias.map(s => new Sentencia(s));
  }
}
