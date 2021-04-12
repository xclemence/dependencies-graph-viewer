// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { UserSecurityService } from '@app/security/services';

// @Injectable({
//   providedIn: 'root'
// })
// export class RightsGuard implements CanActivate {

//   constructor(private _securityService: UserSecurityService, private _router: Router) { }

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

//     const rights = next.data['rights'] as Array<string>;
//     const redirect = next.data['redirect'] as string;

//     if (rights.every(x => this._securityService.hasRight(x))) {
//       return true;
//     }

//     if (redirect === undefined) {
//       return false;
//     }

//     return this._router.parseUrl(redirect);
//   }
// }
