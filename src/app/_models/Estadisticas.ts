export interface IEstadisticas {
   id: number;
   anonymous_id: string;
   isRegistered?: boolean;
   rating: number;
   antiguedad: number;
   tasaExito: number;
   numeroResoluciones: number;
   puntuacion: number;
   alta_colegiacion: Date;
   fecha_actualizacion?: Date;
   provincia?: string;
   comunidad?: string;
   idSolr?: string;
   nombre: string;
   tipo: number;
}

export class Estadisticas implements IEstadisticas {
   id: number;
   anonymous_id: string;
   isRegistered?: boolean;
   rating: number;
   antiguedad: number;
   tasaExito: number;
   numeroResoluciones: number;
   puntuacion: number;
   alta_colegiacion: Date;
   fecha_actualizacion?: Date;
   provincia?: string;
   comunidad?: string;
   idSolr?: string;
   nombre: string;
   tipo: number;

   constructor(o: any) {
      this.id = o.id;
      this.anonymous_id = o.anonymous_id;
      this.isRegistered = o.is_registered;
      this.rating = o.rating;
      this.antiguedad = o.antiguedad;
      this.tasaExito = o.tasaExito;
      this.numeroResoluciones = o.numeroResoluciones;
      this.puntuacion = o.puntuacion;
      this.alta_colegiacion = o.alta_colegiacion;
      this.fecha_actualizacion = o.fecha_actualizacion;
      this.provincia = o.provincia;
      this.comunidad = o.comunidad;
      this.idSolr = o.idSolr;
      this.nombre = o.nombre;
      this.tipo = o.tipo;
   }

}
