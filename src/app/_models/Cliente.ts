import { IUsuario, Usuario } from './Usuario';
export interface ICliente extends IUsuario {
  id: number;
  facebookId?: string;
  facebookToken?: string;
  googleId?: string;
  googleToken?: string;
}

export class Cliente extends Usuario implements ICliente {
  id: number;
  facebookId?: string;
  facebookToken?: string;
  googleId?: string;
  googleToken?: string;
  cif: string;
  empresa: string;
  localidad: string;
  domicilio: string;
  cp: number;

  constructor(o: any) {
    if (o.Usuario) super(o.Usuario);
    this.id = o.id;
    this.facebookId = o.facebook_id
    this.facebookToken = o.facebook_token;
    this.googleId = o.google_id;
    this.googleToken = o.google_token;
  }
}
