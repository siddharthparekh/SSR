export interface IRol {
  id: number
  nombre: string
}

export class Rol implements IRol{
  id: number
  nombre: string
  constructor(o:any) {
    this.id = o.id;
    this.nombre = o.nombre;
  }
}
