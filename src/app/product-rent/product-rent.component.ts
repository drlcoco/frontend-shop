import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { IPopup } from '../interfaces/i-popup';


@Component({
  selector: 'app-product-rent',
  templateUrl: './product-rent.component.html',
  styleUrls: ['./product-rent.component.css']
})

export class ProductRentComponent implements OnInit{
  [x: string]: any;

  poniente!: mapboxgl.Map;
  levante!: mapboxgl.Map;
  access_token!: string;
  markers: mapboxgl.Marker[] = [];
  position!: GeolocationPosition;
  lngLatPoniente: IPopup[] = [
    {
      lngLat: [-0.16249, 38.52722],
      rentPoint: 'Punto P-5'
    },
    {
      lngLat: [-0.15986, 38.53113],
      rentPoint: 'Punto P-4'
    },
    {
      lngLat: [-0.13271, 38.53635],
      rentPoint: 'Punto P-1'
    },
    {
      lngLat: [-0.14230, 38.53699],
      rentPoint: 'Punto P-2'
    },
    {
      lngLat: [-0.15107, 38.53617],
      rentPoint: 'Punto P-3'
    },

  ]
    /* [-0.16249, 38.52722],
    [-0.15986, 38.53113],
    [-0.13271, 38.53635],
    [-0.14230, 38.53699],
    [-0.15107, 38.53617] */

  lngLatLevante: Array<[number, number]> = [
    [-0.12928, 38.53499],
    [-0.10790, 38.53303],
    [-0.12037, 38.53568],
    [-0.12613, 38.53565],
    [-0.11339, 38.53483]
  ];

  ngOnInit() {
    this.poniente = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapa-poniente',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.14900, 38.53302],
      zoom: 12.9,
      bearing: -20
    });
    this.poniente.addControl(new mapboxgl.NavigationControl());

    this.levante = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapa-levante',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.11930, 38.53396],
      zoom: 13.5,
      bearing: 14.4
    });
    this.levante.addControl(new mapboxgl.NavigationControl());

    this.addGeolocateControl();
    this.setRentPoints();
  }

  addMarker(long: number, lat: number, map: mapboxgl.Map, popup: mapboxgl.Popup) {
    // Set marker options.
    const marker = new mapboxgl.Marker({
      color: "#0d6efd",
      draggable: false
    }).setLngLat([long, lat])
    .setPopup(popup)
    .addTo(map);
    this.markers.push(marker);
  }

  addPopupPoniente() {
    this.lngLatPoniente.forEach(element => {
      const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(element.lngLat)
      .setHTML('<h1>Hello World!</h1>')
      .addTo(this.poniente);
    });
  }

  addGeolocateControl() {
    if(this.poniente){
      this.poniente.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
      );
    }
    if(this.levante){
      this.levante.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
      );
    }

  }

  setRentPoints() {
      const rentPoint1: mapboxgl.LngLatLike = [-0.14900, 38.53302];
      navigator.geolocation.getCurrentPosition(this.succesLocation, null, {enableHighAccuracy: true});
      const popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Estamos aquí.'
      );
      // create DOM element for the marker
      const el = document.createElement('div');
      el.id = 'marker';

      if(this.poniente) {
        this.lngLatPoniente.forEach(element => {
          const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(element.lngLat)
            .setHTML('<div class="container d-flex flex-direction-column justify-content-center text-center text-dark"><div class="row"><h1>'+element.rentPoint+'</h1><button class="btn btn-primary mx-auto">Alquilar</button></div></div>')
            .addTo(this.poniente);
          this.addMarker(element.lngLat[0], element.lngLat[1], this.poniente, popup);
        });
      }else{
        console.log(this.poniente);
      }
      if(this.levante) {
        this.lngLatLevante.forEach(element => {
          const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(element)
            .setHTML('<div class="container d-flex flex-direction-column justify-content-center"><div class="row"><h1>Punto '+element+'</h1><button class="btn btn-primary mx-auto">Alquilar</button></div></div>')
            .addTo(this.levante);
          this.addMarker(element[0], element[1], this.levante, popup);
        });
      }else{
        console.log(this.levante);
      }
  }

  succesLocation(position: GeolocationPosition){
    //Aquí se muestran en consola la latitud, longitud y la media de exactitud en metros.
    console.log(position);//Muestra todos los datos.
    console.log("- Latitud: " + position.coords.latitude);//Muestro la latitud.
    console.log("- Longitud: " + position.coords.longitude);//Muestro la longitud.
    console.log("- Exactitud: " + position.coords.accuracy + " metros.");//Muestro la exactitud.
    let datos='';
        datos+='<br>Latitud: '+position.coords.latitude+'<br><br>';
        datos+='Longitud: '+position.coords.longitude+'<br><br>';
        datos+='Exactitud: '+position.coords.accuracy+'mts.<br><br>';

    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    const posicionActual: [number, number] = [lng, lat];

    // create the marker
    // create DOM element for the marker
    const popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
      'Estamos aquí.'
    );
    const el = document.createElement('div');
    el.id = 'marker';
    new mapboxgl.Marker(el)
    .setLngLat(posicionActual)/* (posicionActual) */
    .setPopup(popup3) // sets a popup on this marker
    .addTo(this.poniente);
}

errorLocation(error: PositionErrorCallback){
  return alert('Error: ' + error);
}

/* mostrarUbicacion(){
  navigator.geolocation.getCurrentPosition(this.succesLocation, , {enableHighAccuracy: true});
} */

}
