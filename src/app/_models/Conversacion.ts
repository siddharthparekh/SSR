import { IUsuario, Usuario } from './Usuario';
import { IMensaje, Mensaje } from './Mensaje';
import { IRespuestaLegal, RespuestaLegal } from './RespuestaLegal';

export enum EstadoConv {
   ConversacionInicial = 'CONV_INICIAL',
   Aceptada = 'ACEPTADA',
   Rechazada = 'RECHAZADA',
   CasoConfigurado = 'CASO_CONFIGURADO',
   RespuestaLegal = 'RESPUESTA_LEGAL',
   Pregunta = 'PREGUNTA',
   Aclaracion = 'ACLARACION'
}

export interface IConversacion {
   id: number
   asunto: string
   estado: EstadoConv
   visto: boolean
   updatedAt: Date;
   destinatario?: IUsuario
   Usuarios: Array<IUsuario>
   Mensajes: Array<IMensaje>
   RespuestaLegal: IRespuestaLegal
}

export class Conversacion implements IConversacion {
   id: number
   asunto: string
   estado: EstadoConv
   visto: boolean
   updatedAt: Date;
   Usuarios: Array<IUsuario>
   Mensajes: Array<IMensaje>
   RespuestaLegal: IRespuestaLegal;

   constructor(o: any) {
      this.id = o.id;
      this.asunto = o.asunto;
      this.estado = o.estado;
      this.visto = o.visto;
      this.updatedAt = o.updatedAt;
      if (o.Usuarios) this.Usuarios = o.Usuarios.map(u => new Usuario(u));
      if (o.Mensajes) this.Mensajes = o.Mensajes.map(m => new Mensaje(m));
      if (o.RespuestasLegale) this.RespuestaLegal = new RespuestaLegal(o.RespuestasLegale);
   }
}
