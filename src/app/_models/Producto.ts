import { IEstadisticas, Estadisticas } from "./Estadisticas";
import { IDerecho, Derecho } from "./Derecho";

export interface IProducto {
   id: number;
   nombre: string;
   descripcion: string;
   descuento: number;
   expiracion_descuento: string;
   precio: number;
   EstadisticasProfesional: IEstadisticas;
   gama: string;
   alcance: string;
   tipo: string;
   isAdded?: boolean;
   Derecho: IDerecho
}

export class Producto implements IProducto {
   id: number;
   nombre: string;
   descripcion: string;
   descuento: number;
   expiracion_descuento: string;
   precio: number;
   EstadisticasProfesional: IEstadisticas;
   gama: string;
   alcance: string;
   tipo: string;
   isAdded?: boolean;
   Derecho: IDerecho;

   constructor(o) {
      this.id = o.id;
      this.nombre = o.nombre;
      this.descripcion = o.descripcion;
      this.descuento = o.descuento;
      this.expiracion_descuento = o.expiracion_descuento;
      this.precio = o.precio;
      if (o.ProfesionalesEstadisticaId)
         this.EstadisticasProfesional = o.ProfesionalesEstadistica ?
            new Estadisticas(o.ProfesionalesEstadistica) : new Estadisticas({ id: o.ProfesionalesEstadisticaId });
      this.gama = o.gama;
      this.alcance = o.alcance;
      this.tipo = o.tipo;
      if (o.DerechoId) this.Derecho = new Derecho({ id: o.DerechoId });
   }
}