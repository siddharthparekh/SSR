import { Access, Privacy } from '../interfaces/profile-mode';

export interface ImageData {
   imageUrl: string | null;
   blockingNumber?: number;
}

export interface NameData {
   fullName: string;
   college: string;
   isExpertise: boolean;
   isSpecialist: boolean;
   urlName: string;
}

export interface SpecsData {
   isSpecialist: boolean;
   specs: string[];
}

export interface LocationData {
   locality: string,
   comunity: string,
   province: string
}

export interface SummaryData {
   imageData: ImageData;
   nameData: NameData;
   specsData: SpecsData;
   irjValue: number;
   isExpertise: boolean;
   hasQueries: boolean;
   isRegistered: boolean;
   access: Access;
   privacy: Privacy;
   position?: number;
   location: LocationData
}
