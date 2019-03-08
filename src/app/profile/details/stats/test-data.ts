import {
   LawArea, ClientsData, GlobalEvolutionItem, SpecHeaderData, LocalizacionItem,
} from './interfaces';
import { AccessLevel, AccessMode } from '../../interfaces/profile-mode';

export const testLawAreas: LawArea[] = [
   {
      name: 'Administrativo',
      solutions: 84,
      media: 0.67,
   },
   {
      name: 'Tributario',
      solutions: 47,
      media: 0.76,
   },
   {
      name: 'Internacional privado',
      solutions: 38,
      media: 0.381,
   },
];

export const testClientsData: ClientsData = {
   demanded: {
      individual: 62,
      company: 12,
   },
   demanding: {
      individual: 34,
      company: 29,
   },
}

export const testEvolutionData: GlobalEvolutionItem[] = [
   {
      year: 2014,
      cases: 12,
      results: 0.4,
   },
   {
      year: 2015,
      cases: 14,
      results: 0.44,
   },
   {
      year: 2016,
      cases: 15,
      results: 0.48,
   },
   {
      year: 2017,
      cases: 14,
      results: 0.71,
   },
   {
      year: 2018,
      cases: 21,
      results: 0.48,
   },
];

export const testSpecialities: SpecHeaderData[] = [
   {
      id: 1,
      name: 'Trrrxxxxxrrr vaaaaaaaal',
      irjValue: 88,
      access: {
         level: AccessLevel.Advanced,
         mode: AccessMode.Directory
      }
   },
   {
      id: 2,
      name: 'Seguros',
      irjValue: 68,
      access: {
         level: AccessLevel.Advanced,
         mode: AccessMode.Directory
      }
   },
];

export const testFeaturedAreas: SpecHeaderData[] = [
   {
      id: 3,
      name: 'Urbanismo',
      irjValue: 48,
      access: {
         level: AccessLevel.Advanced,
         mode: AccessMode.Directory
      }
   },
];

export const testLocalizacionesData: LocalizacionItem[] = [
   {
      lat: 28.1248,
      lon: -15.43,
      resoluciones: 50,
      strokecolor: '#FF0000',
      strokeopacity: 0.4,
      strokeweight: 2,
      fillcolor: '#FF0000',
      fillopacity: 0.4,
      radius: 50000,
      localizacion: 'España',
      nombre: 'Test'
   },
];
