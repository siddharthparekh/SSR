import { Access } from '../../interfaces/profile-mode';

export interface TariffsItem {
  title: string;
  price: number;
}

export interface TariffsGroup {
  name: string;
  items: TariffsItem[];
}

export interface TariffsData {
  groups: TariffsGroup[];
  access: Access;
}
