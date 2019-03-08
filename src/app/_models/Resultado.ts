export interface IResultado {
  id: number
  nombre?: string,
  scoring?: number
}

export class Resultado implements IResultado{
  id: number
  nombre?: string
  scoring?: number

  constructor(o: any) {
    this.id = o.id;
    this.nombre = o.nombre;
    this.scoring = o.scoring;
  }
}
