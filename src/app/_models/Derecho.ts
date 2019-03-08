import { ISentencia, Sentencia } from './Sentencia';
import { IDistribucion , Distribucion} from './Distribucion';
import { IProfesional, Profesional } from './Profesional';

export interface IDerecho {
  id: number,
  nombre?: string,
  nivel?: number,
  descripcion?: string,
  Sentencias?: Array<ISentencia>,
  Distribuciones?: Array<IDistribucion>,
  Profesionales?: Array<{ Profesional: IProfesional, rating: number, numeroResoluciones: number, porcentajeExito: number, porcentajeEspecializacion: number, puntuacion: number }>
}

export class Derecho {
  id: number
  nombre?: string
  nivel?: number
  descripcion?: string
  Sentencias?: Array<ISentencia>
  Distribuciones?: Array<IDistribucion>
  Profesionales?: Array<{ Profesional: IProfesional, rating: number, numeroResoluciones: number, porcentajeExito: number, porcentajeEspecializacion: number, puntuacion: number }>

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    this.descripcion = o.descripcion;
    this.nivel = o.nivel
    if (o.Sentencias) this.Sentencias = o.Sentencias.map(s => new Sentencia(s));
    if (o.Distribuciones) this.Distribuciones = o.Distribuciones.map(d => new Distribucion(d));
    if (o.Profesionales) this.Profesionales = o.Profesionales.map(p => {
      if (p.ProfesionalesDerechos)
        return {
          Profesional: new Profesional(p),
          rating: p.ProfesionalesDerechos.rating,
          numeroResoluciones: p.ProfesionalesDerechos.numeroResoluciones,
          porcentajeExito: p.ProfesionalesDerechos.porcentajeExito,
          porcentajeDistribucion: p.ProfesionalesDerechos.porcentajeEspecializacion,
          puntuacion: p.ProfesionalesDerechos.puntuacion
        };
    });
  }
}
