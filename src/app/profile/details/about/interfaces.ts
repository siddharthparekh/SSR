import { Access } from '../../interfaces/profile-mode';

export interface LawyerAgency {
   id: number;
   name: string;
   summaryText?: string;
   adminLevel?: number;
   photo?: string;
}

export interface CareerItem {
   id?: number
   post: string;
   agency: LawyerAgency;
   from: Date;
   to: Date | null;
   location: string | null;
   summaryText: string;
}

export interface FormationItem {
   id?: number
   institution: string;
   certification: string;
   from: Date;
   to: Date | null;
}

export interface ArticlesItem {
   title: string;
   summary: string;
}

export interface NewsItem {
   title: string;
   summary: string;
   imageUrl: string;
}
export interface PersonalInfo {
   name: string;
   college: string;
   n_collegial: string;
   antiquity: number;
}
export interface LawyerLocation {
   address: string;
   comunity: string;
   provincy: string;
   locality: string;
}
export interface Right {
   irj: number;
   name: string;
}

export interface AboutData {
   aboutMeText: string;
   agencies: LawyerAgency[];
   languages: string[];
   careerItems: CareerItem[];
   formationItems: FormationItem[];
   articlesItems: ArticlesItem[];
   newsItems: NewsItem[];
   access: Access;
}