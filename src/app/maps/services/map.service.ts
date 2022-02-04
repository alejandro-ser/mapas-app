import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  setMap( map: Map ) {
    this.map = map;
  }

  flyTo( coords: LngLatLike) {
    if ( !this.isMapReady ) throw Error('El mapa no esta inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces( places: Feature[] ) {

    if ( !this.map ) throw new Error("Mapa no inicializado");

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for (const place of places) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
                          .setHTML(`
                          <h6>${ place.text }</h6>
                          <span>${ place.place_name }</span>
                        `);

      const newMarker = new Marker()
                        .setLngLat([lng, lat])
                        .setPopup( popup )
                        .addTo( this.map );

      newMarkers.push( newMarker );
    }

    this.markers = newMarkers;
  }
}
