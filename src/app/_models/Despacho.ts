import { IProfesional, Profesional } from './Profesional';
import { IExperiencia, Experiencia } from './Experiencia';

export interface IDespacho {
  id: number,
  marca?: string,
  nombre: string,
  nif?: string,
  domicilio?: string,
  localidad: string,
  provincia: string,
  cp?: string,
  pais?: string,
  foto?: string,
  email: string,
  web?: string,
  fecha_creacion: Date,
  telefono: string
  presentation_text?: string,
  rating: number,
  antiguedad: number,
  tasaExito: number,
  numeroResoluciones: number,
  Profesionales?: Array<{ Profesional: IProfesional, is_admin: number }>
  Experiencias?: Array<IExperiencia>
}

export class Despacho implements IDespacho{
  id: number
  marca?: string
  nombre: string
  nif?: string
  domicilio?: string
  localidad: string
  provincia: string
  cp?: string
  pais?: string
  foto?: string
  email: string
  web?: string
  fecha_creacion: Date
  telefono: string
  presentation_text?: string
  rating: number
  antiguedad: number
  tasaExito: number
  numeroResoluciones: number
  Profesionales?: Array<{ Profesional: IProfesional, is_admin: number }>
  Experiencias?: Array<IExperiencia>

  constructor(o: any) {
    this.id = o.id;
    this.marca = o.marca;
    this.nombre = o.nombre;
    this.nif = o.nif;
    this.domicilio = o.domicilio;
    this.localidad = o.localidad;
    this.provincia = o.provincia;
    this.cp = o.cp;
    this.pais = o.pais;
    this.foto = o.foto;
    this.email = o.email;
    this.web = o.web;
    this.fecha_creacion = o.fecha_creacion;
    this.telefono = o.telefono;
    this.presentation_text = o.presentation_text;
    this.rating = o.rating;
    this.antiguedad = o.antiguedad;
    this.tasaExito = o.tasaExito;
    this.numeroResoluciones = o.numeroResoluciones;
    if (o.Profesionales) this.Profesionales = o.Profesionales.map(p => {
      if (p.ProfesionalesDespachos)
        return {
          Profesional: new Profesional(p),
          is_admin: p.ProfesionalesDespachos.is_admin
        };
    });
    if (o.Experiencias) this.Experiencias = o.Experiencias.map(e => new Experiencia(e));
  }
}
