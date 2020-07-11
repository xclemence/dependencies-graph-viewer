import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  load(productionMode: boolean): Promise<boolean> | boolean {

    if (productionMode) {
      return this.http.get('/assets/config.json')
        .toPromise()
        .then((config: any) => {
          environment.assemblyGraphqlUri = config.assemblyGraphqlUri;
          return true;
        }).catch((err) => false);
    }
    return true;
  }
}
