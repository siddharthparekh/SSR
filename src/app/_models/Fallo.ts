import { ISentencia, Sentencia } from './Sentencia';
import { ITipoFallo, TipoFallo } from './TipoFallo';
import { IProfesional, Profesional } from './Profesional';
import { IResultado, Resultado } from './Resultado';
import { IRol, Rol } from './Rol';
import { IFalloParte, FalloParte } from './FalloParte';

export interface IFallo {
   id: number;
   Sentencia: ISentencia;
   TipoFallo: ITipoFallo;
   Partes: IFalloParte[];
}

export class Fallo implements IFallo {
   id: number;
   Sentencia: ISentencia;
   TipoFallo: ITipoFallo;
   Partes: IFalloParte[];

   constructor(o: any) {
      this.id = o.id;
      if (o.SentenciaId) this.Sentencia = o.Sentencia ? new Sentencia(o.Sentencia) : new Sentencia({ id: o.SentenciaId });
      if (o.TipoFallo) this.TipoFallo = new TipoFallo(o.TipoFallo);
      if (o.FallosPartes) this.Partes = o.FallosPartes.map(p => new FalloParte(p));
   }
}
