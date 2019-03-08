
import {of as observableOf,  Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IConversacion } from './../../_models/Conversacion';

@Injectable()
export class SharedComunicationService {
  private level$: Subject<{ level: number, screenWidth: number, SM: number }> = new Subject<{ level: number, screenWidth: number, SM: number }>();
  private conversations: IConversacion[];
  private conversations$ = new Subject<IConversacion[]>();

  constructor() {

  }
  onLevel = (): Observable<{ level: number, screenWidth: number, SM: number }> => {
    return this.level$.asObservable();
  }
  emitLevel(level: number, screenWidth: number, SM: number): void {
    if (typeof level !== 'undefined' && typeof screenWidth !== 'undefined' && typeof SM !== 'undefined') {
      const objState = {
        level: level,
        screenWidth: screenWidth,
        SM: SM
      }
      this.level$.next(objState);
    }
  }
  setConversations(conversations: IConversacion[]) {
    this.conversations = conversations;
    this.conversations$.next(conversations);
  }
  getConversations(): Observable<IConversacion[]> {
    if (!this.conversations) return this.conversations$.asObservable();
    else return observableOf(this.conversations);
  }


}
