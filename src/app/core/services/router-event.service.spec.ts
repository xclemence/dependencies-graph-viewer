import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, CanActivate, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlService } from '@app/core/services';
import { Page1Component, Page2Component, PageMainComponent } from '@app/test/router-test';
import { Store } from '@ngrx/store';

import { addBusyIndicatorAction, removeBusyIndicatorAction } from '../store/actions';
import { CoreState } from '../store/models';
import { LoggerService } from './logger.service';
import { RouterEventService } from './router-event.service';

@Injectable()
export class CancelGuard implements CanActivate {
    canActivate() {
        console.log('cancel navigation');
        return false;
    }
}

const routes: Routes = [
  {
    path: 'test', component: PageMainComponent,
    children: [
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component, canActivate: [CancelGuard] }
  ] },
];

describe('RouterEventService', () => {
  let service: RouterEventService;
  let router: Router;
  let storeSpy: any;
  const urlServiceSpy = jasmine.createSpyObj<UrlService>('UrlService', [ 'moveSegment', 'getCurrentPath']);

  const addBusyAction = addBusyIndicatorAction({ key: 'Main'});
  const removeBusyAction = removeBusyIndicatorAction({ key: 'Main'});

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj<Store<CoreState>>('store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        CancelGuard,
        LoggerService,
        RouterEventService,
        {provide: UrlService, useValue: urlServiceSpy },
        {provide: ActivatedRoute, useValue: { outlet: 'primary' }},
        {provide: Store, useValue: storeSpy},
      ]
    });
    service = TestBed.inject(RouterEventService);
    router = TestBed.inject(Router);
  });

  it('update busy state on navigate', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(addBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(removeBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);

  }));

  it('update busy state on navigate error', fakeAsync(() => {

    try {
      router.navigate(['test', 'page133']);
      tick();
    }
    catch {
      // Do nothing for test
    }

    expect(storeSpy.dispatch).toHaveBeenCalledWith(addBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(removeBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);

  }));

  it('update busy state on navigate cancel', fakeAsync(() => {

    router.navigate(['test', 'page2']);
    tick();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(addBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(removeBusyAction);
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);

  }));

});
