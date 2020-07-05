import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  load(): Promise<boolean> | boolean {

    if (environment.production) {
      return this.http.get('./assets/config.json')
        .toPromise()
        .then((config: any) => {
          environment.assemblyGraphqlUri = config.assemblyGraphqlUri;
          return true;
        }).catch((err) => false);
    }
    return true;
  }
}
