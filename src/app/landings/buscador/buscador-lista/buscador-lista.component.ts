import { Component, Input, OnInit } from "@angular/core";

import {
  BuscadorListaTipos,
  IBuscadorLista
} from "../../../_models/BuscadorListaLanding";
import { EmitterService } from "../../emitter/emitter.service";

@Component({
  selector: "app-buscador-lista",
  templateUrl: "./buscador-lista.component.html",
  styleUrls: ["./buscador-lista.component.css"]
})
export class BuscadorListaComponent implements OnInit {
  @Input() tipo: BuscadorListaTipos;
  @Input() searchResult: IBuscadorLista;
  @Input() term: string;

  constructor(private emitterService: EmitterService) {}

  ngOnInit() {}

  getStyle(url) {
    // CSS styles: set per current state of component properties
    return {
      "background-image": `url('${url}')`,
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-position": "center center"
    };
  }

  boldString(str, find) {
    if (str && str.length > 0 && find && find.length > 0) {
      // <-- This code search the hold sentence -->

      // find = find.replace(/[^a-z A-Z0-9]/gi, "");
      // var re = new RegExp(find, "gi");
      // return str.replace(re, "<b>" + find + "</b>");

      

      
      // <-- This code search each word independently -->

      // replace all character that not match a letter or a number
      find = find.replace(/[^a-z A-Z0-9]/gi, "");
      // split the search to be able of match by word
      const finds = find.split(' ');
      let result = str;
      finds.forEach(ele => {
        if (ele && ele.length > 0) {
          const re = new RegExp(ele, "gi");
          result = result.replace(re, "<b>" + ele + "</b>");
        }
      });
      return result;
    }
    return str;
  }

  clickedResult(model: any) {
    switch (this.tipo) {
      case BuscadorListaTipos.Abogado:
        this.emitterService.abogadoClicked(model);
        break;
      case BuscadorListaTipos.Despacho:
        this.emitterService.despachoClicked(model);
        break;
      case BuscadorListaTipos.Especialidad:
        this.emitterService.especialidadClicked(model);
        break;
      default:
        break;
    }
  }
}
