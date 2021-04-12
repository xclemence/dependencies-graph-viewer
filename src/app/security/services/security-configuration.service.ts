// import { Inject, Injectable, InjectionToken } from '@angular/core';
// import { LoggerService } from '@app/core/services';




// @Injectable({
//   providedIn: 'root'
// })
// export class SecurityConfigurationService {

//   #featureConfig = new Array<FeatureRightsConfig>();

//   get FeatureRights(): FeatureRightsConfig[] {
//     this.logger.log(JSON.stringify(this.#featureConfig));
//     return this.#featureConfig;
//   }

//   constructor(@Inject(ModuleSecurityToken) private moduleConfig: ModuleSecurityConfig,
//               private logger: LoggerService) {}

//   addFeatureRights(rights: FeatureRightsConfig[]) {
//     this.#featureConfig.push(...rights);
//   }


//   getRights(configKey: string): FeatureRightsConfig  {
//     return this.#featureConfig.filter(x => x.feature === configKey)[0];
//   }
// }
