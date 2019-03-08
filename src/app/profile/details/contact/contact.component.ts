import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapsAPILoader, AgmMap, MouseEvent } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

import { ContactService } from './contact.service';
import { parseProfileMode } from '../../utils/parse-profile-mode';
import { ContactData } from './interfaces';
import { AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import { testAddress, testPhone, testEmail } from './test-data';
import { GeocodeService } from '../../../_services/geocode.service';

declare var google: any;
 
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

declare const $: any;

@Component({
  selector: 'app-profile-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    '../../styles/blockable.css',
  ],
})
export class ContactComponent {
  blocked = false;
  @Input() shown;
  private hasInitiallyShown = false;

  hasError = false;
  data: ContactData;

  // google maps zoom level
  zoom: number = 13;
  // initial center position for the map
  loadingmap = false;
  location: any = null;
  errMsg: string;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  }
  ]

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnChanges() {
    if (this.shown && !this.hasInitiallyShown) {
      this.hasInitiallyShown = true;
      this.onInitialShow();
    }
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.data.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specilist-contract-plans")["modal"]("show"),
          200
        );
      }
      if (this.data.access.mode === AccessMode.Directory) {
        setTimeout(
          () => $("#modal-profile-contract-plans")["modal"]("show"),
          200
        );
      }
    }
  }

  private onInitialShow() {
    const mode = parseProfileMode(this.route);
    this.contactService.getContactData(mode).subscribe(
      x => {
        this.data = x.body;
        if (this.data && this.data.address) {
          this.addressToCoordinates(this.data.address);
        }
        this.initBlocking();
      },
      err => {
        console.error(err);
        if (err.status === 444) {
         this.errMsg = "Perfil no encontrado";
      }
        this.hasError = true;
      }
    );
  }

  private initBlocking() {
    const access = this.data.access;
    if (access.mode === AccessMode.Ranking) {
      if (access.level < AccessLevel.Advanced) {
        this.data.address = testAddress;
        this.data.phone = testPhone;
        this.data.email = testEmail;
        this.blocked = true;
      }
    }
  }


  private addressToCoordinates(address: string) {
    this.loadingmap = true;
    this.geocodeService.geocodeAddress(address)
    .subscribe(
      location => {
        this.location = location;
        this.location.label = address;
        this.loadingmap = false;
        this.ref.detectChanges();    
      }      
    );     
  }
  
}
