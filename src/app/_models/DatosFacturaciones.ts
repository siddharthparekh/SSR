import { IUsuario, Usuario } from './Usuario';
export interface IDatosFacturaciones {
  id: number;
  nombre?: string;
  nif?: string;
  domicilio?: string;
  localidad?: string;
  cp?: string;
  provincia?: string;
  iban: string;
  tieneIRPF: string
  Usuario: IUsuario;
}

export class DatosFacturaciones implements IDatosFacturaciones {
  id: number;
  nombre?: string;
  nif?: string;
  domicilio?: string;
  localidad?: string;
  cp?: string;
  provincia?: string;
  iban: string;
  tieneIRPF: string
  Usuario: IUsuario;

  constructor(o: any) {
    this.Usuario = new Usuario({ id: o.Usuario });
    this.id = o.id;
    this.nombre = o.nombre;
    this.nif = o.nif;
    this.domicilio = o.domicilio;
    this.localidad = o.localidad;
    this.cp = o.cp;
    this.tieneIRPF = o.tieneIRPF;
    this.provincia = o.provincia;
    this.iban = o.iban;
  }
}
