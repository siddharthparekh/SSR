import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.css", "../common.css"]
})
export class AboutUsComponent implements OnInit {
  whoTalkAboutUs: string[] = [];

  constructor() {}

  ngOnInit() {
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/123-emprende.png"
    );
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/todostartups.png"
    );
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/la-voz-de-galicia.png"
    );
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/revista-emprendedores.png"
    );
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/logo-loogic-480.png"
    );
    this.whoTalkAboutUs.push(
      "/assets/images/landing/about-us/derecho-practico.png"
    );
  }

  getStyle(url) {
    // CSS styles: set per current state of component properties
    return {
      "background-image": `url('${url}')`,
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center center"
    };
  }
}
