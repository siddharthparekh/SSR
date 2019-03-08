import { Access } from '../../interfaces/profile-mode';
import { HeaderData } from './specs/interfaces';

export interface LawArea {
  name: string;
  solutions: number;
  media: number;
}

export interface ClientsData {
  demanded: {
    individual: number;
    company: number;
  };
  demanding: {
    individual: number;
    company: number;
  };
}

export interface GlobalEvolutionItem {
  year: number;
  cases: number;
  results: number;
}

export interface LocalizacionItem {
  lat: number;
  lon: number;
  resoluciones: number;
  radius: number;
  strokecolor: string;
  strokeopacity: number;
  strokeweight: number;
  fillcolor: string;
  fillopacity: number;
  localizacion: string;
  nombre: string;
}

export interface StatsData {
  irjValue: number;
  yearsOfXp: number;
  casesAnalyzed: number;
  casesEstimated?: number;
  lawAreas: LawArea[];
  clientsData: ClientsData;
  evolutionData: GlobalEvolutionItem[];
  specialities: SpecHeaderData[];
  featuredAreas: SpecHeaderData[];
  localizacionesData: LocalizacionItem[];
  access: Access;
}

export interface SpecHeaderData extends HeaderData {}
