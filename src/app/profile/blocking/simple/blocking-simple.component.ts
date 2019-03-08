import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-blocking-simple',
  templateUrl: './blocking-simple.component.html',
})
export class BlockingSimpleComponent implements OnInit, AfterViewInit {
  @Input() sticky = false;
  @Input() isRanking = false;

  tolltipSetted = false;

  ngOnInit() { }

  ngAfterViewInit() {
    if (!this.tolltipSetted) {
      this.tolltipSetted = true;
      $(function () {
        $('[data-toggle="tooltip"]').tooltip({
          delay: { show: 100, hide: 0 },
          boundary: "window",
          placement: function (tip, element) {
            const position = $(element).offset();
            const perX =
              window.outerWidth > 1200
                ? 0.2
                : window.outerWidth > 991
                  ? 0.3
                  : window.outerHeight > 768
                    ? 0.4
                    : 0.5;

            if (position.left / window.outerWidth >= 1 - perX) {
              return "left";
            }
            if (position.left / window.outerWidth < perX) {
              return "right";
            }
            if (position.top < 300) {
              return "bottom";
            }
            return "top";
          }
        });
      });
    }
  }
}
