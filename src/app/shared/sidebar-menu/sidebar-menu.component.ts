import { Component, OnInit, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit, AfterViewChecked {
  @Output() onChangeLink: EventEmitter<any> = new EventEmitter<boolean>();
  @Output() onChangeOpenedGroup: EventEmitter<any> = new EventEmitter<boolean>();
  @Input() openedGroup = false;
  @Input() userurl1 = "";
  @Input() userurl2 = "";
  @Input() miperfil = false;
  icPagos = true;

  constructor(
    private _changeDetectionRef : ChangeDetectorRef
  ) { }

  ngOnInit() {
    $('.sidebar-nav-group.collapse').on('show.bs.collapse', function() {
      $('.sidebar-nav-group.collapse').collapse('hide');
      // console.log('show.bs.collapse');
    });
    $('.el-nav-link-click').on('click', function() {
      $('.sidebar-nav-group.collapse').collapse('hide');
      // console.log('el-nav-link-click');
    });
  }

  ngAfterViewChecked() : void {
    this._changeDetectionRef.detectChanges();
    this.openCollapse();
  }
  
  openCollapse() {
    if (!this.openedGroup) {
      var group = $('.nav-link.sidebar-nav-link.router-link-active');
      if (group && group.length == 1) {
        this.onChangeOpenedGroup.emit(true);
        // this.openedGroup = true;
        group.parent().collapse({toggle: true});
        // this.scrollSidebar();
      }
    }
  }

  collapseGroups() {
    $('.sidebar-nav-group.collapse').collapse('hide');
  }

  changeLink(link, image) {
    // this.onChangeLink.emit({link: link, image: image});
    $('.sidebar-nav-group.collapse').collapse('hide');
  }

  clickOutsideMenuSidebar() {
    // console.log('click fuera del sidebar');
    $('.sidebar-nav-group.collapse').collapse('hide');
    // this.openCollapse();
  }
  clickSidebar() {
    console.log('clickSidebar');
  }
}
