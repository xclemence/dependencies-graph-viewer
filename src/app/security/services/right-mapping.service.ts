import { Injectable } from '@angular/core';
import { ConfigurationService } from '@app/core/services/configuration.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RightMappingService {

  constructor(private readonly configService: ConfigurationService) {}

  getApplicationRight(right: string): string {
    return this.configService.configuration.security.rightMapping?.find(x => x.server === right)?.app ?? right;
  }
}
