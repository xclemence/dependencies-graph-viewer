// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from '@app/core/models/user';
// import { Observable, of } from 'rxjs';

// import { FeatureRightsService } from './feature-rights.service';
// import { UserSecurityService } from './user-security.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor(private userService: UserSecurityService,
//               private featureRightsService: FeatureRightsService,
//               private router: Router) { }

//   logon(userName: string, password: string): Observable<boolean> {
//     if (userName !== 'xce') {
//       return of(false);
//     }

//     const user = new User({name: userName, roles: ['admin', 'super-user']});
//     this.userService.user = user;
//     localStorage.setItem('userToken', 'TokenForAuthen');
//     return of(true);
//   }

//   logout() {
//     this.userService.user = null;
//     localStorage.removeItem('userToken');

//     this.ensureCurrentLocation();
//   }

//   private ensureCurrentLocation() {
//     if (!this.featureRightsService.validateCurrentLocation(null)) {
//       this.router.navigateByUrl('/');
//     }
//   }
// }
