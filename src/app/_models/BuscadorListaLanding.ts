export const DERECHO_MATERIA: string = 'MATERIA'

export enum BuscadorListaTipos {
   Abogado,
   Despacho,
   Especialidad,
}

export interface IBuscadorLista {
   foto?: string
   texto: string
   esExperto: boolean
   id: number
}

export class BuscadorLista implements IBuscadorLista {
   foto?: string
   texto: string
   esExperto: boolean
   id: number

   constructor(b: any) {
      this.foto = b.foto
      this.texto = b.texto
      this.esExperto = b.esExperto
      this.id = b.id;
   }
}

type tipoEspecialidad = 'MATERIA' | 'DERECHO';
export interface IBuscadorListaEspecialidad {
   derecho: string
   materia?: string
   tipo: tipoEspecialidad
   texto: string
}
export class BuscadorListaEspecialidad implements IBuscadorListaEspecialidad {
   derecho: string
   materia?: string
   tipo: tipoEspecialidad
   texto: string

   constructor(o: any) {
      this.texto = o.texto;
      this.derecho = o.derecho;
      this.materia = o.derechoConcreto;
      this.tipo = o.tipo;
   }
}

export interface IBuscadorListaLanding {
   abogado: string
   abogados?: Array<IBuscadorLista>
   despacho: string
   despachos?: Array<IBuscadorLista>
   especialidad: string
   especialidades?: Array<IBuscadorListaEspecialidad>
}

export class BuscadorListaLanding implements IBuscadorListaLanding {
   abogado: string
   abogados?: Array<IBuscadorLista>
   despacho: string
   despachos?: Array<IBuscadorLista>
   especialidad: string
   especialidades?: Array<IBuscadorListaEspecialidad>

   constructor(b: any) {
      this.abogado = b.abogado
      if (b.abogados) this.abogados = b.abogados
      this.despacho = b.despacho
      if (b.despachos) this.despachos = b.despachos
      this.especialidad = b.especialidad
      if (b.especialidades) this.especialidades = b.especialidades
   }
}
