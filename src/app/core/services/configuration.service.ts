import { Injectable } from '@angular/core';
import * as data from '@app/../assets/config.json';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  load(): boolean {

    if (environment.production)
    {
      const configuration = (data as any).default;
      environment.assemblyGraphqlUri = configuration.assemblyGraphqlUri;
    }
    return true;
  }
}
