import { IDerecho, Derecho } from './Derecho';
import { IFallo, Fallo } from './Fallo';
import { Estadisticas } from './Estadisticas';
import { IProceso, Proceso } from './Proceso';

export interface ISentencia {
   id: number;
   ecli: string;
   numeroResolucion: string;
   fecha: Date;
   year: number;
   tipoResolucion: string;
   rutaArchivo: string;
   numeroFallos: number;
   idSolr: string;
   Fallos: Array<IFallo>;
   Derechos: Array<IDerecho>;
   Proceso: IProceso;
   ProfesionalesEstadisticas: Estadisticas[];
   createdAt: Date;
   Orden?: IDerecho;
   DerechoPrincipal?: IDerecho;
}

export class Sentencia implements ISentencia {
   id: number;
   ecli: string;
   numeroResolucion: string;
   fecha: Date;
   year: number;
   tipoResolucion: string;
   rutaArchivo: string;
   numeroFallos: number;
   idSolr: string;
   Fallos: Array<IFallo>;
   Derechos: Array<IDerecho>;
   Proceso: IProceso;
   ProfesionalesEstadisticas: Estadisticas[];
   createdAt: Date
   Orden?: IDerecho;
   DerechoPrincipal?: IDerecho;

   constructor(o: any) {
      this.id = o.id;
      this.ecli = o.ecli;
      this.numeroResolucion = o.numeroResolucion;
      this.fecha = o.fecha;
      this.year = o.year;
      this.tipoResolucion = o.tipoResolucion;
      this.rutaArchivo = o.rutaArchivo;

      this.numeroFallos = o.numeroFallos;
      this.createdAt = o.createdAt;
      if (o.ProfesionalesEstadistica)
         this.ProfesionalesEstadisticas = o.ProfesionalesEstadistica.map(p => new Estadisticas(p));
      if (o.Derechos) this.Derechos = o.Derechos.map(d => new Derecho(d));
      if (o.Fallos) this.Fallos = o.Fallos.map(f => new Fallo(f));
      if (o.Proceso) this.Proceso = new Proceso(o.Proceso);
   }
}
