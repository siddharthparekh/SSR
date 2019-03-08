import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { IUsuarioStorage } from './../../../_models/UsuarioStorage';
import { PaymentsService } from './../../../_services/payments.service';
import { ProvinciasService } from './../../../_services/provincias.service';
import { SharedUserService } from './../../../_services/shared-user.service';


@Component({
    selector: 'app-datos-facturacion',
    templateUrl: './datos-facturacion.component.html',
    styleUrls: ['./datos-facturacion.component.css'],
    providers: [ProvinciasService]
})
export class DatosFacturacionComponent implements OnInit, OnChanges {
    formulario = {} as any;
    provincias: any;
    provinciaIdInicialFacturacion: string;
    ngUnsubscribe = new Subject<void>();
    esSociedadCivil: boolean = false;
    isEnabledEstadoConsultas = false;
    reqInProg = false;
    @Input() hiddenData = false;
    @Input() editing = false;
    @Input() user: IUsuarioStorage;
    @Input() onSubmitForm: Observable<void>;
    @Output() updateFinishEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() onValidityChange = new EventEmitter<boolean>();
    @Output() onDataChange = new EventEmitter<any>();

    @ViewChild('datosFactForm') ngForm: any;

    constructor(
        private provinciasService: ProvinciasService,
        private paymentService: PaymentsService,
        private sharedUserSerivce: SharedUserService
    ) { }

    ngOnInit() {
        this.ngForm.form.statusChanges.subscribe(x =>{
            this.onValidityChange.emit(x == "VALID")
            this.onDataChange.emit(this.formulario);
        });
        if (this.onSubmitForm) this.onSubmitForm.subscribe(
            () => this.updateDatosFacturacion(this.formulario),
            err => console.log(err)
        )
        this.provincias = this.provinciasService.getProvincias().map(
            option => {
                return {
                    value: option.text,
                    label: option.text
                }
            }
        );
        if (!this.user) {
            this.user = this.sharedUserSerivce.getUser();
            this.createForm(this.user);
        }
    }
    ngOnChanges() {
        if (this.user) this.createForm(this.user);
    }
    createForm(usuario: IUsuarioStorage = {} as any) {
        if (usuario && usuario.DatosFacturaciones) {
            let provinciaSelect2Facturacion = this.provinciasService.getProvinciaByName(usuario.DatosFacturaciones.provincia);
            if (provinciaSelect2Facturacion) this.provinciaIdInicialFacturacion = provinciaSelect2Facturacion.id;
        }
        const datosFacturacion = usuario.DatosFacturaciones || {} as any;
        this.formulario = {
            nombre: datosFacturacion.nombre,
            nif: datosFacturacion.nif,
            domicilio: datosFacturacion.domicilio,
            localidad: datosFacturacion.localidad,
            cp: datosFacturacion.cp,
            provincia: datosFacturacion.provincia,
            iban: datosFacturacion.iban,
            tieneIRPF: datosFacturacion.tieneIRPF
        }
        this.formatCardNumber();

    }
    updateDatosFacturacion(backendFormulario: any) {
        var backendFormulario = Object.assign({}, this.formulario);
        backendFormulario.iban = formatCardNumberForBackend(this.formulario.iban);
        this.paymentService.updateDatosFacturacion(backendFormulario).pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(
                () => {
                    this.sharedUserSerivce.setDatosFacturacion(this.formulario);
                    this.updateFinishEmitter.emit();
                }, (err) => {
                    this.updateFinishEmitter.emit(err);
                })
    }
    onProvinciaSelectFacturacion($event) {
        this.formulario.provincia = $event.value;
    }
    onNifChange() {
        this.esSociedadCivil = this.formulario.nif.trim().substring(0, 1).toUpperCase() === 'J' ? true : false;
        if (!this.esSociedadCivil) this.formulario.tieneIRPF = null;
    }
    onEsIRPF(value: boolean) {
        this.formulario.tieneIRPF = value;
    }
    formatCardNumber(): void {
        if (this.formulario.iban) this.formulario.iban = this.formulario.iban.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    }
}
function formatCardNumberForBackend(cardnumber: string): string {
    if (!cardnumber) return undefined;
    return cardnumber.replace(/ /g, '');
}