export interface IOrganoJudicial {
   nombre: string;
   type: string;
   localizacion: string;
   provincia: string;
   comunidad: string;
   lat: number;
   lon: number;
}

export class OrganoJudicial implements IOrganoJudicial {
   nombre: string;
   type: string;
   localizacion: string;
   provincia: string;
   comunidad: string;
   lat: number;
   lon: number;

   constructor(o) {
      this.nombre = o.nombre;
      this.type = o.type;
      this.localizacion = o.localizacion;
      this.provincia = o.provincia;
      this.comunidad = o.comunidad;
      this.lat = o.lat;
      this.lon = o.lon;
   }
}