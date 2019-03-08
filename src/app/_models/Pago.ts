import { IRespuestaLegal, RespuestaLegal } from './RespuestaLegal';
import { Usuario, IUsuario } from './Usuario';

export interface IPago {
   id: number;
   stripeId: number;
   stripe: any;
   importeTotal: number;
   importeBase: number;
   retencion: number;
   createdAt: Date;
   updatedAt: Date;
   facturaEmerita: boolean;
   emisorEsEntidad: boolean;
   iva: number;
   nombreEmisor: string;
   nombreReceptor: string;
   direccionEmisor: string;
   direccionReceptor: string;
   cifEmisor: string;
   cifReceptor: string;
   comisionEmerita: number;
   idFacturaProfesional: number
   Receptor: IUsuario;
}
export class Pago implements IPago {
   id: number;
   stripeId: number;
   stripe: any;
   importeTotal: number;
   importeBase: number;
   retencion: number;
   createdAt: Date;
   updatedAt: Date;
   facturaEmerita: boolean;
   emisorEsEntidad: boolean;
   iva: number;
   nombreEmisor: string;
   nombreReceptor: string;
   direccionEmisor: string;
   direccionReceptor: string;
   cifEmisor: string;
   cifReceptor: string;
   comisionEmerita: number;
   idFacturaProfesional: number;
   Receptor: IUsuario;

   constructor(o: any) {
      this.id = o.id;
      this.idFacturaProfesional = o.idFacturaProfesional;
      this.stripeId = o.stripeId;
      this.stripe = o.stripe;
      this.importeTotal = o.importeTotal;
      this.importeBase = o.importeBase;
      this.retencion = o.retencion;
      this.emisorEsEntidad = o.emisorEsEntidad;
      this.createdAt = o.createdAt;
      this.updatedAt = o.updatedAt;
      this.iva = o.iva;
      this.nombreEmisor = o.nombreEmisor;
      this.nombreReceptor = o.nombreReceptor;
      this.direccionEmisor = o.direccionEmisor;
      this.direccionReceptor = o.direccionReceptor;
      this.cifEmisor = o.cifEmisor;
      this.cifReceptor = o.cifReceptor;
      this.comisionEmerita = o.comisionEmerita;
      this.idFacturaProfesional = o.idFacturaProfesional;
      this.Receptor = o.ReceptorId ?
         new Usuario(o.Receptor) : new Usuario({ id: o.ReceptorId });
   }
}
