// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { UserSecurityService } from '@app/security/services';

// import { FeatureRightsService } from '../services/feature-rights.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ComponentRightsGuard implements CanActivate {

//   constructor(private securityService: UserSecurityService, private featureRightsService: FeatureRightsService,
//     private router: Router) { }

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

//     const redirect = next.data.redirect as string;

//     const component = next.component.toString();

//     return
//     if (this.featureRightsService.validateComponentRight(component, this.securityService.user)) {
//       return true;
//     }

//     if (redirect === undefined) {
//       return false;
//     }

//     return this.router.parseUrl(redirect);
//   }
// }
