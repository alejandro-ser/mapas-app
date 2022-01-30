import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const Mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlam9zZWdpIiwiYSI6ImNrejFsZm14ajBoYW0yd3QyaXYwYzRkd3cifQ.VkAU8r8luxt69IcuK94KSw';

if ( !navigator.geolocation) {
  throw new Error('El navegador no soporta la geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
