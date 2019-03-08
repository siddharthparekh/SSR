import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class RoutesService {

  backRoute: {commands: any[], extras: NavigationExtras};

  constructor() { }

  getBackRoute = (): {commands: any[], extras: NavigationExtras} => {
    return this.backRoute;
  }
  setBackRoute = (route: {commands: any[], extras: NavigationExtras}): void => {
    this.backRoute = route;
  }

}
