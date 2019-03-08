import { IConversacion, Conversacion } from './Conversacion';
import { IDatosFacturaciones, DatosFacturaciones } from './DatosFacturaciones';
import { IProfesional } from './Profesional';

export interface IUsuario {
  id: number
  email?: string,
  password?: string,
  token?: string
  nombre: string,
  apellidos?: string
  foto?: string,
  tipo?: number
  reset_password_token?: string,
  reset_password_expiration?: string,
  fechaRegistro?: Date,
  Conversaciones?: Array<IConversacion>;
  DatosFacturaciones?: DatosFacturaciones;
  Profesional?: any;
  MetaFront?: { skipTarifas: boolean }
}

export class Usuario implements IUsuario {
  id: number
  email?: string
  nombre: string
  apellidos?: string
  foto?: string
  tipo?: number
  fechaRegistro?: Date
  Conversaciones?: Array<IConversacion>
  DatosFacturaciones?: DatosFacturaciones;
  Profesional?: any;
  MetaFront?: { skipTarifas: boolean }
  
  constructor(o: any) {
    this.id = o.id;
    this.email = o.email;
    this.nombre = o.nombre;
    this.apellidos = o.apellidos;
    this.foto = o.foto;
    this.tipo = o.tipo;
    this.Profesional = o.Profesionale;
    this.fechaRegistro = o.fechaRegistro;
    if (o.Conversaciones) this.Conversaciones = o.Conversaciones.map(c => new Conversacion(c));
    if (o.DatosFacturacione) this.DatosFacturaciones = new DatosFacturaciones(o.DatosFacturacione);
    this.MetaFront = { skipTarifas: o.MetaFront ? o.MetaFront.skipTarifas : undefined };
  }
}
