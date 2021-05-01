import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RightMappingService {

  getApplicationRight(right: string): string {
    return environment.security.rightMapping.find(x => x.server == right)?.app ?? right;
  }
}
