import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SideBarEmitterService {
  private sideBarAnimSource = new Subject<boolean>();

  sideBarAnim$ = this.sideBarAnimSource.asObservable();

  constructor() { }

  // Service message commands
  sideBarAnim(status) {
    this.sideBarAnimSource.next(status);
  }
}
