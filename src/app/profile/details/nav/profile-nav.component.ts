import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostBinding,
  AfterViewInit
} from "@angular/core";
import { HostListener } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-profile-nav",
  templateUrl: "./profile-nav.component.html",
  styleUrls: ["./profile-nav.css"]
})
export class ProfileNavComponent implements OnInit {
  @Output() showTab: EventEmitter<number> = new EventEmitter();
  shownTabIndex = 1;

  constructor() { }

  ngOnInit() {
    this.showTab.emit(this.shownTabIndex);
  }

  changeTab(index: number, $event) {
    $event.preventDefault();
    window.scroll(0, 0);
    this.shownTabIndex = index;
    this.showTab.emit(this.shownTabIndex);
  }
}
