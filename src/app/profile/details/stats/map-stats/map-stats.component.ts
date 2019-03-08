/// <reference types="@types/googlemaps" />

import { Component, OnInit, Input, ViewChild, AfterViewChecked, ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';
import { LocalizacionItem } from '../interfaces';
import { AccessMode, AccessLevel, Access } from '../../../interfaces/profile-mode';
import { environment } from '../../../../../environments/environment.test';
// import {} from 'googlemaps';

declare const $: any;
// declare var google: any;

@Component({
  selector: 'app-profile-stats-map-stats',
  templateUrl: './map-stats.component.html',
  styleUrls: ['./map-stats.component.css']
})
export class MapStatsComponent implements OnInit, AfterViewInit {
  @Input() access: Access;
  @Input() data: LocalizacionItem[];
  olat = 42.8710509;
  olon = -9.638648;
  lat = 0;
  lon = 0;

  zoom: number = 9;
  blocked = false;
  apikey = environment.gmaps_apikey;

  @ViewChild('googleMap') gmapElement: any;
  map: google.maps.Map;

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const access = this.access;
    if (!!access && access.mode === AccessMode.Directory) {
      if (access.level < AccessLevel.Essential) {
        this.blocked = true;
      }
    }
    // Obtener la posicion inicial promedio
    this.lat = this.olat;
    this.lon = this.olon;
    // console.log('loadPosiciones', this.gmapElement)
    // this.loadPosiciones();
  }

  ngAfterViewInit(): void {
    if (this.gmapElement) {
      this.loadPosiciones();
    }
  }

  loadPosiciones() {
    // console.log('ngAfterViewInit', this.gmapElement)
    if (this.gmapElement) {
      var mapProp = {
        center: new google.maps.LatLng(this.lat, this.lon),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        // mapTypeId: google.maps.MapTypeId.HYBRID
        // mapTypeId: google.maps.MapTypeId.SATELLITE
        // mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      // var marker = new google.maps.Marker({ position: mapProp.center });
      // marker.setMap(this.map);
      // var infowindow = new google.maps.InfoWindow({
      //   content: "Hey, We are here"
      // });
      // infowindow.open(this.map, marker);

      let resoluciones = 0;
      // console.log('locations', this.data)
      if (this.data.length > 0) {
        this.lat = 0;
        this.lon = 0;
        this.data.forEach((item: any) => {
          if (item['lat'] && item['lon'] && item['resoluciones'] > resoluciones) {
            resoluciones = item['resoluciones'];
            this.lat = item['lat'];
            this.lon = item['lon'];
          }
          var cityCircle = new google.maps.Circle({
            strokeColor: item['strokecolor'],
            strokeOpacity: item['strokeopacity'],
            strokeWeight: item['strokeweight'],
            fillColor: item['fillcolor'],
            fillOpacity: item['fillopacity'],
            map: this.map,
            center: { lat: item['lat'], lng: item['lon'] },
            radius: item.radius,
            zIndex: 9999 - item['resoluciones']
          });
          if (item['lat'] && item['lon']) this.addCircleListeners(cityCircle, item);
        });
        this.map.setCenter({ lat: this.lat, lng: this.lon });
      }
    }
  }

  addCircleListeners(marker: any, location: LocalizacionItem) {
    const html = '<div id="el-map-stats-tooltip">' + 
      '<div class="text-center el-map-stats-tooltip-loc">Localización: <strong>' + location.localizacion + '</strong></div>' +
      '<div class="text-center el-map-stats-tooltip-nom"><strong>' + location.nombre + '</strong></div>' +
      '<div class="text-center el-map-stats-tooltip-res">Casos: <strong>' + location.resoluciones + '</strong></div>' + 
      '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: html
    });
    var newmarker = new google.maps.Marker({
      position: { lat: location['lat'], lng: location['lon'] },
      icon: location.resoluciones > 100 ? 'assets/images/map-pin-o.png' : location.resoluciones > 10 ? 'assets/images/map-pin.png' : 'assets/images/map-pin.png',
    });
    google.maps.event.addListener(marker, 'mouseover', function (event) {
      // console.log('circle mouseover', marker, location);
      newmarker.setMap(this.map);
      infowindow.open(this.map, newmarker);
    });
    google.maps.event.addListener(marker, 'mouseout', function (event) {
      // console.log('circle mouseout', marker, location);
      newmarker.setMap(null);
      infowindow.close();
    });
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specialist-contract-plans")["modal"]("show"),
          200
        );
      }
      if (this.access.mode === AccessMode.Directory) {
        setTimeout(
          () => $("#modal-profile-contract-plans")["modal"]("show"),
          200
        );
      }
    }
  }

  public circleClick(event: any) {
    console.log('circleClick', event);
  }

  public circleMouseOver(event: any) {
    console.log('circleMouseOver', event);
  }

  public circleMouseOut(event: any) {
    console.log('circleMouseOut', event);
  }

}
