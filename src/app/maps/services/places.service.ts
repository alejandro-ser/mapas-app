import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation
  }

  constructor( private http: HttpClient ) {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ( {coords} ) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve( this.useLocation );
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery( query: string = '') {
    // todo: evaluar cuando el query es nulo

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?country=de&limit=5&proximity=8.68258247439627%2C50.115069828512645&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYWxlam9zZWdpIiwiYSI6ImNrejFsYmtyZzFoNnMyb3F2NjNkZmp5MjIifQ.-W-vkqP7mkZPQqssNTyM4A`)
        .subscribe( resp => {
          console.log(resp.features);

          this.isLoadingPlaces = false;
          this.places = resp.features;
        } );
  }
}
