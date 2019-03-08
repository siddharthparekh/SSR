import { Component, Input, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { FeedbackService } from "./feedback.service";
import { parseProfileMode } from "../../utils/parse-profile-mode";
import { FeedbackItem } from "./interfaces";

@Component({
   selector: "app-profile-feedback",
   templateUrl: "./feedback.component.html",
   styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnChanges {
   @Input() shown;
   private hasInitiallyShown = false;

   hasError = false;
   items: FeedbackItem[];
   errMsg: string;
   mainAverageRating: number;
   averageAsesoramiento: number;
   averageAtencion: number;
   averageCalidad: number;
   constructor(
      private feedbackService: FeedbackService,
      private route: ActivatedRoute
   ) { }

   ngOnChanges() {
      if (this.shown && !this.hasInitiallyShown) {
         this.hasInitiallyShown = true;
         this.onInitialShow();
      }
   }

   private onInitialShow() {
      const mode = parseProfileMode(this.route);
      this.feedbackService.getFeedbackItems(mode).subscribe(
         data => {
            const items = data.body;
            items.sort((a, b) => (a.date < b.date ? 1 : -1));
            this.items = items;
            this.calcMainAverageRating();
         },
         err => {
            console.error(err);
            if (err.status === 444) {
               this.errMsg = "Perfil no encontrado";
            }
            this.hasError = true;
         }
      );
   }

   get isItemsPresent(): boolean {
      return !!this.items;
   }

   calcMainAverageRating(): void {
      let sum = 0;
      this.averageAsesoramiento = this.getAverageRatingValue("ratingAsesoramiento");
      this.averageAtencion = this.getAverageRatingValue("ratingAtencion");
      this.averageCalidad = this.getAverageRatingValue("ratingCalidad");

      const averages = [this.averageAsesoramiento, this.averageAtencion, this.averageCalidad];
      for (const average of averages)
         sum += average;

      let result = sum / averages.length;
      this.mainAverageRating = isNaN(result) ? 0 : result;
   }

   getAverageRatingValue(ratingType: string): number {
      let sum = 0;
      for (const item of this.items) {
         sum += item[ratingType];
      }
      let result = sum / this.items.length;
      return isNaN(result) ? 0 : result;
   }
}
