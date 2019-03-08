import { IProfesional, Profesional } from './Profesional';

export interface IColegio {
  id: number,
  nombre?: string,
  localizacion?: string,
  Profesionales?: Array<{ Profesional?: IProfesional, n_colegiado?: string, alta_colegiacion?: Date }>
}

export class Colegio implements IColegio {
  id: number
  nombre?: string
  localizacion?: string
  Profesionales?: Array<{ Profesional?: IProfesional, n_colegiado?: string, alta_colegiacion?: Date }>
  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    this.localizacion = o.localizacion;
    if (o.Profesionales) this.Profesionales = o.Profesionales.map(p => {
      if (p.ProfesionalesColegios)
        return {
          Profesional: new Profesional(p),
          n_colegiado: p.ProfesionalesColegios.n_colegiado,
          alta_colegiacion: p.ProfesionalesColegios.alta_colegiacion
        }
    });
  }
}
