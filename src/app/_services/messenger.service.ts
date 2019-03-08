
import { tap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { IConversacion, Conversacion } from '../_models/Conversacion';
import { IMensaje, Mensaje } from '../_models/Mensaje';
import { SharedUserService } from '../_services/shared-user.service';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';

@Injectable()
export class MessengerService {
   private socket: any;
   private BASE_URL = environment.api_url;
   private notify$: Subject<number> = new Subject();
   private messageIn$: Subject<{ message: IMensaje, conversation: IConversacion }> = new Subject<{ message: IMensaje, conversation: IConversacion }>();
   private conversationIn$: Subject<IConversacion> = new Subject<IConversacion>();
   private progressFile$: Subject<{ progress: number, msgId: number }> = new Subject<{ progress: number, msgId: number }>();


   constructor(private handleError: HandleError, private sharedUserService: SharedUserService, private http: HttpClient) {
      this.sharedUserService.isLogged$.subscribe(isLoggedIn => {
         if (isLoggedIn) this.connect();
         else this.disconnect();
      });
   }

   onMessageIn(): Observable<{ message: IMensaje, conversation: IConversacion }> {
      return this.messageIn$.asObservable();
   }
   onConversationIn(): Observable<IConversacion> {
      return this.conversationIn$.asObservable();
   }
   onProgressFile(): Observable<{ progress: number, msgId: number }> {
      return this.progressFile$.asObservable();
   }

   parseMensaje = (obj: any): IMensaje => {
      return new Mensaje(obj);
   }
   parseConversacion = (obj: any): IConversacion => {
      const c = new Conversacion(obj);
      return c;
   }

   onNotify(): Observable<{}> {
      return this.notify$.asObservable();
   }
   //se notifica 0 significa que hai unha notificacion
   emitNotify(): void {
      this.notify$.next(0);
   }
   //se notifica un numero > 0 significa que é o id dunha conversa e que xa se veu (visto = true);
   emitConvReaded(idConver: number): void {
      this.notify$.next(idConver);
   }
   connect(): void {
      // FALTA ENVIAR TOKEN para servidor poder permitir
      this.socket = io.connect(environment.api_domain_url, { path: '/api/socket.io' });
      // this.socket.io.on('connect_error', function(err) {
      // });
      this.socket.on('connect', () => {
         this.authenticate();
      });

      this.startListeting();
   }
   authenticate() {
      this.socket.emit('authenticate', { token: this.sharedUserService.getToken() }) //send the jwt
         .on('authenticated', () => {
            this.socket.emit('init', {
               id: this.sharedUserService.getUserId()
            });
         })
         .on('unauthorized', function (error, callback) {
            if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
               callback();
            }
            throw new Error(error.data.type);
         })
   }
   disconnect(): void {
      if (this.socket) {
         this.socket.disconnect();
         this.socket = null;
      }
   }
   startListeting() {
      this.socket.on('msg', (dataMsg: { message: IMensaje, conversation: IConversacion }) => {
         this.messageIn$.next({ message: new Mensaje(dataMsg.message), conversation: new Conversacion(dataMsg.conversation) });
         this.emitNotify();
      });
      this.socket.on('conv', conv => {
         this.conversationIn$.next(new Conversacion(conv));
         this.emitNotify();
      });
      this.socket.on('error', error => {
         console.log("error event" + error);
      });
      // this.socket.on('reconnect_failed', () => {
      // console.log('error reconnect_failed event');
      // });
      // this.socket.on('connect_timeout', (timeout) => {
      // console.log('error connect_timeout event');
      // });
      // this.socket.on('reconnect_attempt', () => {
      // console.log('reconnect_attemp');
      // });
   }
   sendMsg(msgObj, idFront?: number): Observable<IMensaje> {
      return Observable.create(observer => {
         const data = new FormData();
         let url = this.BASE_URL + '/users/' + msgObj.RemitenteId + '/conversation/' + msgObj.ConversacionId + '/message';
         if (msgObj.RespuestaLegal) {
            if (msgObj.RespuestaLegal.presupuesto) {
               url += '?presupuesto=true';
               data.append('file', msgObj.RespuestaLegal.presupuesto);
               delete msgObj.RespuestaLegal.presupuesto;
            }
            data.append('RespuestaLegal', JSON.stringify(msgObj.RespuestaLegal));
            delete msgObj.RespuestaLegal;
         }
         if (msgObj.file) {
            data.append('file', msgObj.file);
            delete msgObj.file;
         }
         Object.keys(msgObj).forEach(key => {
            data.append(key, msgObj[key]);
         });
         const xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               if (xhr.status === 200 || xhr.status === 201) {
                  observer.next(new Mensaje(JSON.parse(xhr.response)));
                  observer.complete();
               } else {
                  observer.error(xhr.response)
               }
            }
         }
         xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && idFront) {
               const percentComplete: number = parseInt(((e.loaded / e.total) * 100).toFixed());
               this.progressFile$.next({ progress: percentComplete, msgId: idFront });
            }
         }
         xhr.open("POST", url, true);
         xhr.setRequestHeader('Authorization', 'Bearer ' + this.sharedUserService.getToken());
         xhr.send(data)
      });
   }
   newConversation(conversation, id): Observable<IConversacion> {
      return this.http.post(this.BASE_URL + '/users/' + id + '/conversation',
         conversation).pipe(
            map(this.parseConversacion),
            tap((c) => this.conversationIn$.next(c)),
            catchError(this.handleError.handleError));
   }
   getAllMessagesConversation(id_conversation): Observable<IConversacion> {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversation/' + id_conversation + '/messages', {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(map(this.parseConversacion),
         catchError(this.handleError.handleError));
   }
   getConversations(limit?: number): Observable<IConversacion[]> {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversations?items=' + limit, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map((conversaciones: any) => {
            let c = conversaciones.map((c) => {
               const conv = this.parseConversacion(c);
               return conv;
            });
            return c;
         }),
         catchError(this.handleError.handleError));
   }
   setAsReaded(conversation_id: number): Observable<any> {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversation/' + conversation_id + '/visto', {
         readed: true
      },
         {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
         }).pipe(catchError(this.handleError.handleError));
   }
   setConversationAsConfigured(conversation_id: number): Observable<IConversacion> {
      return this.updateConversationState(conversation_id, 'CASO_CONFIGURADO');
   }
   aceptCase(conversation_id: number): Observable<IConversacion> {
      return this.updateConversationState(conversation_id, 'ACEPTADA');
   }
   refuseCase(conversation_id: number): Observable<IConversacion> {
      return this.updateConversationState(conversation_id, 'RECHAZADA');
   }
   updateConversationState(conversation_id: number, state: string): Observable<IConversacion> {
      return this.http.put<IConversacion>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversation/' + conversation_id + '/estado',
         { state: state },
         {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
         }).pipe(catchError(this.handleError.handleError));
   }
   verifyCaptcha(response): Observable<boolean> {
      return this.http.post<boolean>(this.BASE_URL + '/recaptcha/verify', {
         response: response
      },
         {
            headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
         }).pipe(catchError(this.handleError.handleError));
   }
   downloadFile(conversacionId: number, mensajeId: number): Observable<any> {
      return this.http.get(this.BASE_URL +
         '/users/' + this.sharedUserService.getUserId() + '/conversation/' + conversacionId + '/file/' + mensajeId, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()),
            responseType: 'blob'
         }).pipe(
            catchError(this.handleError.handleError));
   }
   sendInvitationExternalClient(email: string): Observable<void> {
      return this.http.post<void>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/invitarConversacion',
         {
            email
         },
         {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
         }).pipe(catchError(this.handleError.handleError));
   }

}
