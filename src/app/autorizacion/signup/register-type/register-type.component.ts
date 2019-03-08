import { Component, OnInit } from '@angular/core'
import { AuthService } from 'angular2-social-login'

@Component({
    selector: 'app-register-type',
    templateUrl: './register-type.component.html',
    styleUrls: ['./register-type.component.css', '../../common.css'],
    providers: [AuthService],
})
export class RegisterTypeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
