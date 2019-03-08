export interface ITop {
   id: number;
   provincia: string;
   comunidad: string;
}
export class Top implements ITop {
   id: number;
   provincia: string;
   comunidad: string;

   constructor(o) {
      this.id = o.id;
      this.provincia = o.provincia;
      this.comunidad = o.comunidad;
   }
}