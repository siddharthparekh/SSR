import { ClientsData } from '../interfaces';
import { Access } from '../../../interfaces/profile-mode';

export interface HeaderData {
   id: number;
   name: string;
   irjValue: number;
   access: Access;
}

export interface RankingData {
   placeNational: number;
   placeCommunity: number;
   placeProvincial: number;
   nation: string,
   comunity: string,
   province: string,
   antiguedad: number
}

export interface SubjectsDataItem {
   name: string;
   children?: SubjectsDataItem[];
}

export interface CasesData {
   analyzed: number;
   media: number;
}

export interface SpecClientsData extends ClientsData { }

export interface SuccessRateData {
   simple: {
      value: number,
      mediaValue: number,
   },
   company: {
      value: number,
      mediaValue: number,
   },
   individual: {
      value: number,
      mediaValue: number,
   },
}

export interface LineChartItem {
   year: number;
   global: number;
   media: number;
}

export interface ContentData {
   rankingData: RankingData;
   subjectsData: SubjectsDataItem[];
   casesData: CasesData;
   clientsData: SpecClientsData;
   successRateData: SuccessRateData;
   evolutionCasesData: LineChartItem[];
   resultsData: LineChartItem[];
}
