import { IUsuario, Usuario } from './Usuario';
import { IExperiencia, Experiencia } from './Experiencia';
import { IEducacion, Educacion } from './Educacion';
import { IDistribucion, Distribucion } from './Distribucion';
import { IDespacho, Despacho } from './Despacho';
import { IDerecho, Derecho } from './Derecho';
import { IFallo, Fallo } from './Fallo';
import { IColegio, Colegio } from './Colegio';
import { ISentencia, Sentencia } from './Sentencia';
import { IResultado, Resultado } from './Resultado';
import { IRol, Rol } from './Rol';
import { IEstadisticas, Estadisticas } from './Estadisticas';


export interface IProfesional extends IUsuario {
   id: number
   ejerciente?: boolean
   telefono?: string
   registration_cod?: string
   presentation_text?: string
   tipoProfesional?: number;
   cplat?: number
   cplon?: number
   domicilio?: string;
   localidad?: string;
   consultas: boolean;
   cp?: number;
   isSignupAprobed: boolean;
   Experiencia?: Array<IExperiencia>
   Colegios?: Array<{ Colegio?: IColegio, n_colegiado?: string, alta_colegiacion?: Date }>
   Educacion?: Array<IEducacion>
   Despachos: Array<{ Despacho: IDespacho, is_admin: number }>;
   Estadisticas: IEstadisticas;
   visualizacionPerfil: number;
}

export class Profesional extends Usuario implements IProfesional {
   id: number
   ejerciente?: boolean
   telefono?: string
   registration_cod?: string
   presentation_text?: string
   tipoProfesional?: number;
   cplat?: number;
   cplon?: number;
   domicilio?: string;
   localidad?: string;
   consultas: boolean;
   cp?: number;
   isSignupAprobed: boolean;
   Experiencia?: Array<IExperiencia>
   Colegios?: Array<{ Colegio?: IColegio, n_colegiado?: string, alta_colegiacion?: Date }>
   Educacion?: Array<IEducacion>
   Despachos: Array<{ Despacho: IDespacho, is_admin: number }>;
   Estadisticas: IEstadisticas;
   visualizacionPerfil: number;

   constructor(o: any) {
      if (o.Usuario) super(o.Usuario);
      this.id = o.id;
      this.ejerciente = o.ejerciente;
      this.telefono = o.telefono;
      this.isSignupAprobed = o.is_signup_aprobed;
      this.presentation_text = o.presentation_text;
      this.tipoProfesional = o.tipo;
      this.domicilio = o.domicilio;
      this.localidad = o.localidad;
      this.cp = o.cp;
      this.cplat = o.cplat;
      this.cplon = o.cplon;
      this.consultas = o.consultas;
      this.visualizacionPerfil = o.visualizacion_perfil;
      if (o.Experiencia) {
         this.Experiencia = o.Experiencia.map(e => new Experiencia(e));
      }
      if (o.Colegios) this.Colegios = o.Colegios.map(c => {
         if (c.ProfesionalesColegios)
            return {
               Colegio: new Colegio(c),
               n_colegiado: c.ProfesionalesColegios.n_colegiado,
               alta_colegiacion: c.ProfesionalesColegios.alta_colegiacion
            }
      });
      if (o.Educacion) this.Educacion = o.Educacion.map(e => new Educacion(e));
      if (o.Despachos) this.Despachos = o.Despachos.map(d => {
         if (d.ProfesionalesDespachos)
            return {
               Despacho: new Despacho(d),
               is_admin: d.ProfesionalesDespachos.is_admin
            }
      });
      if (o.ProfesionalesEstadistica) this.Estadisticas = new Estadisticas(o.ProfesionalesEstadistica);
   }
}
