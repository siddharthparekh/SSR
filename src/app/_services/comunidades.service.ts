import { Injectable } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

@Injectable()
export class ComunidadesService {
   private comunidadesSelect2: Array<Select2OptionData> = [];
   private comunidadesText: Array<string> = [
      'Galicia',
      'Comunidad de Madrid',
      'Canarias',
      'País Vasco',
      'Castilla-La Mancha',
      'Comunitat Valenciana',
      'Melilla',
      'Murcia',
      'Andalucía',
      'Castilla y León',
      'Asturias',
      'Aragón',
      'Illes Balears',
      'Cataluña',
      'Cantabria',
      'Extremadura',
      'Navarra',
      'Ceuta',
      'La Rioja',
   ];

   constructor() {
      for (let comunidad of this.comunidadesText) {
         this.comunidadesSelect2.push({ id: comunidad, text: comunidad });
      }
   }

   getComunidades = (): Array<any> => {
      return this.comunidadesSelect2;
   }
   getComunidad(id: number): Select2OptionData {
      return this.comunidadesSelect2.find(e => e.id == String(id));
   }
   getComunidadByName(name: string): Select2OptionData {
      return this.comunidadesSelect2.find(e => e.text === name);
   }

}
