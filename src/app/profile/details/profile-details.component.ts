import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ProfileEmitterService } from '../../_services/profile-emitter.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: [
    './styles/profile-details.css'
  ],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  public sticky = false;
  public stickyBottom = false;
  @ViewChild("profileNavHolder") profileNavHolder: ElementRef;
  public width = 0;
  public bottomNavContent: number;
  isNavLawyer = false;
  shownTabIndex: number;
  putPositionStickyBottomClass = false;
  private subscription: any[] = [];

  constructor(private profileEmitterService: ProfileEmitterService) { }

  ngOnInit() {
    this.setListenner();
  }

  ngOnDestroy() {
    this.subscription.forEach(val => val.unsubscribe());
  }

  setListenner() {
    this.subscription.push(this.profileEmitterService.loadedReady$.subscribe(() => {
      this.onResize();
      setTimeout(() => {
        this.onResize();
        this.putPositionStickyBottomClass = true;
      }, 1500);
    }));
  }

  onTabChanged($event) {
    this.shownTabIndex = $event;
  }

  ngAfterViewInit() {
    this.onResize();
  }

  @HostListener("window:scroll", []) // for window scroll events
  onScroll() {
    if (this.profileNavHolder) {
      const navHolder = this.profileNavHolder.nativeElement.getBoundingClientRect();
      const footer = document.querySelector('footer').getBoundingClientRect();

      if (this.bottomNavContent > 0 && this.width > 767 && footer.top < this.bottomNavContent) {
        this.stickyBottom = true;
        this.sticky = false;
      } else if ((this.width < 768 && navHolder.top <= 130) || (this.width > 767 && navHolder.top <= (this.isNavLawyer ? 170 : 189))) {
        this.sticky = true;
        this.setBottomNavContent();
        this.stickyBottom = false;
      } else {
        this.sticky = false;
        this.stickyBottom = false;
      }
    } else {
      this.sticky = false;
      this.stickyBottom = false;
    }
  }

  @HostListener("window:resize", []) // for window resize events
  onResize() {
    this.isNavLawyer = document.querySelector("nav.topbar-abogado") ? true : false;
    this.setBottomNavContent();
    this.width = window.outerWidth;
    this.onScroll();
  }

  private setBottomNavContent(): void {
    const navContent = document.querySelector('.profile-nav-wrapper--holder').getBoundingClientRect();
    this.bottomNavContent = navContent.top + navContent.height + 24;
  }
}
