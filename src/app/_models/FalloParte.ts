import { IResultado } from "./Resultado";
import { IEstadisticas, Estadisticas } from "./Estadisticas";

export interface IFalloParte {
   PosicionProcesal: IPosicionProcesal
   Resultados: IResultado
   ProfesionalEstadistica: IEstadisticas
   Partes: { nombre: string }
}

export class FalloParte implements IFalloParte {
   PosicionProcesal: IPosicionProcesal;
   Resultados: IResultado
   ProfesionalEstadistica: IEstadisticas
   Partes: { nombre: string }

   constructor(o) {
      if (o.PosicionesProcesaleId) this.PosicionProcesal = o.PosicionesProcesale ?
         new PosicionProcesal(o.PosicionesProcesale) : new PosicionProcesal({ id: o.PosicionesProcesaleId });
      if (o.ProfesionalesEstadisticaId) this.ProfesionalEstadistica = o.ProfesionalesEstadistica ?
         new Estadisticas(o.ProfesionalesEstadistica) : new Estadisticas({ id: o.ProfesionalesEstadisticaId });
   }
}

interface IPosicionProcesal {
   id: number;
   nombre: string;
}
class PosicionProcesal implements IPosicionProcesal {
   id: number;
   nombre: string;
   constructor(o) {
      this.id = o.id;
      this.nombre = o.nombre;
   }
}