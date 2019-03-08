import { Component, Input, OnInit } from "@angular/core";

import { SummaryData } from "../interfaces";
import { Access, AccessMode, AccessLevel } from "../../interfaces/profile-mode";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile-summary-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.styles.css", "./image-cropper.css"]
})
export class ImageComponent implements OnInit {
  @Input() sticky = false;
  @Input() data: SummaryData;
  @Input() access: Access;
  blocked = false;
  isRanking = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
     this.data.imageData
    const access = this.access;
    if (access && access.mode === AccessMode.Ranking) {
      this.isRanking = true;
      if (access.level < AccessLevel.Advanced) {
        this.blocked = true;
      }
    }
  }
}
