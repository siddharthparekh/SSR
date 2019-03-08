import { Injectable } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

@Injectable()
export class ProvinciasService {
  private provinciasSelect2: Array<Select2OptionData> = [];
  private provinciasText: Array<{ provinciaRaw: string, provinciaClean: string }> = [
    { provinciaRaw: "", provinciaClean: "" },
    { provinciaRaw: "ÁLAVA", provinciaClean: "ÁLAVA" },
    { provinciaRaw: "ALBACETE", provinciaClean: "ALBACETE" },
    { provinciaRaw: "ALICANTE/ALACANT", provinciaClean: "ALICANTE" },
    { provinciaRaw: "ALMERÍA", provinciaClean: "ALMERÍA" },
    { provinciaRaw: "ASTURIAS", provinciaClean: "ASTURIAS" },
    { provinciaRaw: "ÁVILA", provinciaClean: "ÁVILA" },
    { provinciaRaw: "BADAJOZ", provinciaClean: "BADAJOZ" },
    { provinciaRaw: "BARCELONA", provinciaClean: "BARCELONA" },
    { provinciaRaw: "BURGOS", provinciaClean: "BURGOS" },
    { provinciaRaw: "CÁCERES", provinciaClean: "CÁCERES" },
    { provinciaRaw: "CÁDIZ", provinciaClean: "CÁDIZ" },
    { provinciaRaw: "CANTABRIA", provinciaClean: "CANTABRIA" },
    { provinciaRaw: "CASTELLÓN/CASTELLÓ", provinciaClean: "CASTELLÓN" },
    { provinciaRaw: "CEUTA", provinciaClean: "CEUTA" },
    { provinciaRaw: "CIUDAD REAL", provinciaClean: "CIUDAD_REAL" },
    { provinciaRaw: "CÓRDOBA", provinciaClean: "CÓRDOBA" },
    { provinciaRaw: "CORUÑA, A", provinciaClean: "CORUÑA" },
    { provinciaRaw: "CUENCA", provinciaClean: "CUENCA" },
    { provinciaRaw: "GIPUZKOA", provinciaClean: "GIPUZKOA" },
    { provinciaRaw: "GIRONA", provinciaClean: "GIRONA" },
    { provinciaRaw: "GRANADA", provinciaClean: "GRANADA" },
    { provinciaRaw: "GUADALAJARA", provinciaClean: "GUADALAJARA" },
    { provinciaRaw: "HUELVA", provinciaClean: "HUELVA" },
    { provinciaRaw: "HUESCA", provinciaClean: "HUESCA" },
    { provinciaRaw: "ILLES BALEARS", provinciaClean: "BALEARES" },
    { provinciaRaw: "JAÉN", provinciaClean: "JAÉN" },
    { provinciaRaw: "LEÓN", provinciaClean: "LEÓN" },
    { provinciaRaw: "LLEIDA", provinciaClean: "LLEIDA" },
    { provinciaRaw: "LUGO", provinciaClean: "LUGO" },
    { provinciaRaw: "MADRID", provinciaClean: "MADRID" },
    { provinciaRaw: "MÁLAGA", provinciaClean: "MÁLAGA" },
    { provinciaRaw: "MELILLA", provinciaClean: "MELILLA" },
    { provinciaRaw: "MURCIA", provinciaClean: "MURCIA" },
    { provinciaRaw: "NAVARRA", provinciaClean: "NAVARRA" },
    { provinciaRaw: "OURENSE", provinciaClean: "OURENSE" },
    { provinciaRaw: "PALENCIA", provinciaClean: "PALENCIA" },
    { provinciaRaw: "PALMAS, LAS", provinciaClean: "PALMAS" },
    { provinciaRaw: "PONTEVEDRA", provinciaClean: "PONTEVEDRA" },
    { provinciaRaw: "RIOJA, LA", provinciaClean: "RIOJA" },
    { provinciaRaw: "SALAMANCA", provinciaClean: "SALAMANCA" },
    { provinciaRaw: "SANTA CRUZ DE TENERIFE", provinciaClean: "TENERIFE" },
    { provinciaRaw: "SEGOVIA", provinciaClean: "SEGOVIA" },
    { provinciaRaw: "SEVILLA", provinciaClean: "SEVILLA" },
    { provinciaRaw: "SORIA", provinciaClean: "SORIA" },
    { provinciaRaw: "TARRAGONA", provinciaClean: "TARRAGONA" },
    { provinciaRaw: "TERUEL", provinciaClean: "TERUEL" },
    { provinciaRaw: "TOLEDO", provinciaClean: "TOLEDO" },
    { provinciaRaw: "VALENCIA/VALÈNCIA", provinciaClean: "VALENCIA" },
    { provinciaRaw: "VALLADOLID", provinciaClean: "VALLADOLID" },
    { provinciaRaw: "VIZCAYA", provinciaClean: "VIZCAYA" },
    { provinciaRaw: "ZAMORA", provinciaClean: "ZAMORA" },
    { provinciaRaw: "ZARAGOZA", provinciaClean: "ZARAGOZA" }]

  constructor() {
    let i: number = 0;
    for (let provincia of this.provinciasText) {
      this.provinciasSelect2.push({ id: String(i), text: provincia.provinciaRaw });
      i++;
    }
  }

  getProvincias = (): Array<any> => {
    return this.provinciasSelect2;
  }
  getProvincia(id: number): Select2OptionData {
    return this.provinciasSelect2.find(e => e.id == String(id));
  }
  getProvinciaByName(name: string): Select2OptionData {
    return this.provinciasSelect2.find(e => e.text === name);
  }
  getProvinciaClean(provinciaRaw: string): string {
    const i = this.provinciasText.findIndex(provinciaObject => provinciaObject.provinciaRaw === provinciaRaw);
    return i >= 0 ? this.provinciasText[i].provinciaClean : null;
  }

}
