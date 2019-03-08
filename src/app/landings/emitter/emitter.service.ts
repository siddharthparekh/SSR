import { Injectable } from '@angular/core'
import { IBuscadorLista, IBuscadorListaEspecialidad } from '../../_models/BuscadorListaLanding'
import { Subject } from 'rxjs'

@Injectable({
   providedIn: 'root',
})
export class EmitterService {
   // Observable sources
   private abogadoClickedSource = new Subject<IBuscadorLista>()
   private despachoClickedSource = new Subject<IBuscadorLista>()
   private especialidadClickedSource = new Subject<IBuscadorListaEspecialidad>()

   // Observable string streams
   abogadoClicked$ = this.abogadoClickedSource.asObservable()
   despachoClicked$ = this.despachoClickedSource.asObservable()
   especialidadClicked$ = this.especialidadClickedSource.asObservable()

   constructor() { }

   // Service message commands
   abogadoClicked(model: IBuscadorLista) {
      this.abogadoClickedSource.next(model)
   }

   despachoClicked(model: IBuscadorLista) {
      this.despachoClickedSource.next(model)
   }

   especialidadClicked(model: IBuscadorListaEspecialidad) {
      this.especialidadClickedSource.next(model)
   }
}
