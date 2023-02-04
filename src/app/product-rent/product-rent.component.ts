import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { IPopup } from '../interfaces/i-popup';
import { ActivatedRoute, Router } from '@angular/router';


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
      id: 5,
      lngLat: [-0.16249, 38.52722],
      rentPoint: 'Punto P-5'
    },
    {
      id: 4,
      lngLat: [-0.15986, 38.53113],
      rentPoint: 'Punto P-4'
    },
    {
      id: 1,
      lngLat: [-0.13271, 38.53635],
      rentPoint: 'Punto P-1'
    },
    {
      id: 2,
      lngLat: [-0.14230, 38.53699],
      rentPoint: 'Punto P-2'
    },
    {
      id: 3,
      lngLat: [-0.15107, 38.53617],
      rentPoint: 'Punto P-3'
    }
  ];

  lngLatLevante: IPopup[] = [
    {
      id: 6,
      lngLat: [-0.12928, 38.53499],
      rentPoint: 'Punto L-1'
    },
    {
      id: 10,
      lngLat: [-0.10790, 38.53303],
      rentPoint: 'Punto L-5'
    },
    {
      id: 8,
      lngLat: [-0.12037, 38.53568],
      rentPoint: 'Punto L-3'
    },
    {
      id: 7,
      lngLat: [-0.12613, 38.53565],
      rentPoint: 'Punto L-2'
    },
    {
      id: 9,
      lngLat: [-0.11339, 38.53483],
      rentPoint: 'Punto L-4'
    }
  ];

  constructor(
    private route:ActivatedRoute,
    private router: Router) { }

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

  addMarker(long: number, lat: number, map: mapboxgl.Map, id: number) {
    // create DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(../../assets/2.png)`;
    el.style.width = `50px`;
    el.style.height = `50px`;
    el.style.backgroundSize = '100%';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      console.log('Está funcionando '+id);
      this.router.navigate(['pointer', id]);
    });

    // Set marker options.
    const marker = new mapboxgl.Marker(el).setLngLat([long, lat])
    .addTo(map);
    this.markers.push(marker);
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
    navigator.geolocation.getCurrentPosition(this.succesLocation, null, {enableHighAccuracy: true});
    if(this.poniente) {
      this.lngLatPoniente.forEach(element => {
        console.log(element.id);

        this.addMarker(element.lngLat[0], element.lngLat[1], this.poniente, element.id);
      });
    }else{
      console.log(this.poniente);
    }
    if(this.levante) {
      this.lngLatLevante.forEach(element => {
        this.addMarker(element.lngLat[0], element.lngLat[1], this.levante, element.id);
      });
    }else{
      console.log(this.levante);
    }
  }

  succesLocation(position: GeolocationPosition){
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    const posicionActual: [number, number] = [lng, lat];
  }

  errorLocation(error: PositionErrorCallback){
    return alert('Error: ' + error);
  }

}
