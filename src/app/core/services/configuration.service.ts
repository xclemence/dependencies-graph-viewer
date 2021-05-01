import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  async load(productionMode: boolean): Promise<boolean> {

    if (productionMode) {
      try {
        const config = await this.http.get<any>('/assets/config.json').toPromise()
        environment.assemblyGraphqlUri = config.assemblyGraphqlUri;

        environment.security = {
          ... config.security,
          rightMapping: [... config.security.rightMapping]
        };

      } catch {
        return false;
      }
    }

    return true;
  }
}
