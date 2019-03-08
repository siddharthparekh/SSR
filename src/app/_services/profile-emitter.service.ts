import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileEmitterService {
  private loadedReadySource = new Subject<void>();

  loadedReady$ = this.loadedReadySource.asObservable();

  constructor() { }

  // Service message commands
  notifyLoaded() {
    this.loadedReadySource.next();
  }
}
