import { IMensaje, Mensaje } from './Mensaje';
import { IValoracion, Valoracion } from './Valoracion';
import { Conversacion, IConversacion } from './Conversacion';
import { IPresupuesto, Presupuesto } from "./Presupuesto";

export enum EstadoRespuesta {
  Borrador = 'BORRADOR',
  Enviada = 'ENVIADA',
  Aceptada = 'ACEPTADA',
  PendienteAclaracion = 'PENDIENTE_ACLARACION',
  Rechazada = 'RECHAZADA',
  Cerrada = 'CERRADA'
}

export interface IRespuestaLegal {
  id: number;
  estado: EstadoRespuesta;
  precio: number;
  Categoria: ICategoria;
  presupuesto?: string;
  createdAt: Date;
  textoBorrador: string;
  Mensaje: IMensaje;
  Conversacion: IConversacion;
  Valoracion: IValoracion;
  // Presupuesto: IPresupuesto;
}

export class RespuestaLegal implements IRespuestaLegal {
  id: number;
  estado: EstadoRespuesta;
  precio: number;
  Categoria: ICategoria;
  presupuesto?: string;
  createdAt: Date;
  textoBorrador: string;
  Mensaje: IMensaje;
  Conversacion: IConversacion;
  Valoracion: IValoracion;
  // Presupuesto: IPresupuesto;

  constructor(o: any) {
    this.id = o.id;
    this.estado = o.estado;
    this.precio = o.precio;
    this.textoBorrador = o.textoBorrador
    if (o.CategoriaRespuestaId) this.Categoria = o.CategoriasRespuestum ? new Categoria(o.CategoriasRespuestum) : new Categoria({ id: o.CategoriaRespuestaId });
    this.presupuesto = o.presupuestoPath;
    this.createdAt = o.createdAt;
    if (o.Mensaje) this.Mensaje = o.Mensaje ? new Mensaje(o.Mensaje) : new Mensaje({ id: o.MensajeId });
    this.Conversacion = o.Conversacione ? new Conversacion(o.Conversacione) : new Conversacion({ id: o.ConversacioneId });
    if (o.ValoracioneId) this.Valoracion = o.Valoracione ? new Valoracion(o.Valoracione) : new Valoracion({ id: o.ValoracioneId });
    // if (o.Presupuesto) this.Presupuesto = new Presupuesto(o.Presupuesto);
  }
}
export interface ICategoria {
  id: number;
  nombre: string;
  precio: number
}
export class Categoria implements ICategoria {
  id: number;
  nombre: string;
  precio: number;
  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    this.precio = o.precio;
  }
}
