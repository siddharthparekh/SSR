export interface FeedbackItem {
   userName: string | null;
   isVerified: boolean;
   ratingAtencion: number;
   ratingAsesoramiento: number;
   ratingCalidad: number;
   ratingAvg: number;
   date: Date;
   comment: string;
}
