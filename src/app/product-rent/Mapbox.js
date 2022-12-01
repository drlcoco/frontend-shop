'use strict'

let form = document.getElementById("form");
let boton = document.getElementById("obtener");
let hidden = document.querySelectorAll("hidden");
let mostrar = document.getElementById("mostrar");
let ubicacion=document.getElementById('ubicacion');
let benidorm = [-0.12757397366123246, 38.5350780361453];
boton.addEventListener("click", mostrarUbicacion);

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJsY29jbyIsImEiOiJja3duaDJ1cjcwMmRlMm9yNDhtZ2h1dDR6In0.E5se5LTJeY1BhNvvvWiAtw';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-0.12757397366123246, 38.5350780361453], // starting position
    zoom: 9 // starting zoom
});

function succesLocation(position){
    //Aquí se muestran en consola la latitud, longitud y la media de exactitud en metros.
    console.log(position);//Muestra todos los datos.
    console.log("- Latitud: " + position.coords.latitude);//Muestro la latitud.
    console.log("- Longitud: " + position.coords.longitude);//Muestro la longitud.
    console.log("- Exactitud: " + position.coords.accuracy + " metros.");//Muestro la exactitud.
    let datos='';
        datos+='<br>Latitud: '+position.coords.latitude+'<br><br>';
        datos+='Longitud: '+position.coords.longitude+'<br><br>';
        datos+='Exactitud: '+position.coords.accuracy+'mts.<br><br>';
        form.innerHTML=datos;

    let lng = position.coords.longitude;
    let lat = position.coords.latitude;
    let posicionActual = [lng, lat];

    // create the marker
    new mapboxgl.Marker(el)
    .setLngLat(posicionActual)/* (posicionActual) */
    .setPopup(popup3) // sets a popup on this marker
    .addTo(map);
}
function errorLocation(error){
    alert('Error: ' + error.code + ' ' + error.message);
}

//Cuando se pulsa el botón se llama a la api.
function mostrarUbicacion(position){
  console.log("Botón pulsado");
    navigator.geolocation.getCurrentPosition(succesLocation, errorLocation, {enableHighAccuracy: true});
}

    // Add zoom and rotation controls to the map.
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    // Add fullscreen control to the map.
map.addControl(new mapboxgl.FullscreenControl());

// Create a new marker.
// Set marker options.
const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
    'Esta es mi casa.'
);
const marker = new mapboxgl.Marker({
    color: "#008888",
    draggable: true
}).setLngLat([-0.119335233193405, 38.534983559913556])
    .setPopup(popup1)
    .addTo(map);

// Set marker options.
const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
    'Este es mi trabajo.'
);
const marker2 = new mapboxgl.Marker({
    color: "#008888",
    draggable: true
}).setLngLat([-0.018781979999999993, 38.62429427999999])
    .setPopup(popup2)
    .addTo(map);

const popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
    'Estamos aquí.'
);

// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';

//Ies Pere Maria
/* 38.553460623013045, -0.12067835310208033 */







