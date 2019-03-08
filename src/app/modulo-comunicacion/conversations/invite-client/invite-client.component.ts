import { Component, OnInit } from '@angular/core';
import { MessengerService } from './../../../_services/messenger.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-client',
  templateUrl: './invite-client.component.html',
  styleUrls: ['./invite-client.component.css']
})
export class InviteClientComponent implements OnInit {

  reqInProg = false;
  constructor(private messengerService: MessengerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }


  enviarInvitacion(value, email: string) {
    this.reqInProg = value;
    this.messengerService.sendInvitationExternalClient(email).subscribe(res => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.reqInProg = false;
    }, err => {
      this.reqInProg = false;
    })
  }
}
