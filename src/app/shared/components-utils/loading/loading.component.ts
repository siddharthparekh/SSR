import { Component } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-profile-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"]
})
export class LoadingComponent {
  @Input() transparent = true;
  @Input() label;
}
