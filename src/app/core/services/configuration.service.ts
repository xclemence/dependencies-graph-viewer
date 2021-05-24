import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';

declare global {
  interface Window { __env: Configuration; }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  get configuration(): Configuration {
    return window.__env;
  }
}
