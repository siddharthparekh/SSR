import { IProfesional, Profesional } from './Profesional';
import { IConversacion, Conversacion } from './Conversacion';
import { IRespuestaLegal, RespuestaLegal } from './RespuestaLegal';

export interface IMensaje {
  id: number
  texto: string
  tipo: number
  createdAt?: Date
  Conversacion: IConversacion
  Remitente: IProfesional;
  RespuestaLegal?: IRespuestaLegal;
}

export class Mensaje implements IMensaje {
  id: number
  texto: string
  tipo: number
  Conversacion: IConversacion
  Remitente: IProfesional
  createdAt: Date
  RespuestaLegal: IRespuestaLegal;

  constructor(o: any) {
    this.id = o.id;
    this.texto = o.texto;
    this.tipo = o.tipo;
    this.createdAt = o.createdAt;
    if (o.RespuestasLegale) this.RespuestaLegal = new RespuestaLegal(o.RespuestasLegale);
    this.Conversacion = o.Conversacione ? new Conversacion(o.Conversacione) : new Conversacion({ id: o.ConversacioneId });
    if (o.Remitente && o.Remitente.Profesionale) {
      o.Remitente.Profesionale.Usuario = o.Remitente;
      this.Remitente = new Profesional(o.Remitente.Profesionale);
    } else if (o.Remitente) {
      o.Remitente.Usuario = o.Remitente;
      this.Remitente = new Profesional(o.Remitente);
    } else if (o.RemitenteId){
      this.Remitente = new Profesional({ id: o.RemitenteId })
    }
  }
}
