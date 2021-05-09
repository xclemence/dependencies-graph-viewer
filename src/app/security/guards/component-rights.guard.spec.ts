import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { RightService } from '../services/right.service';
import { ComponentRightsGuard } from './component-rights.guard';

@Component({})
class TestComponent { }

const initialState = {
  security: {
    currentUser: undefined,
    featuresConfiguration: [],
    noRightPath: 'redirect'
  }
};

describe('ComponentRightsGuard', () => {
  let guard: ComponentRightsGuard;
  let rightServiceSpy: jasmine.SpyObj<RightService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    rightServiceSpy = jasmine.createSpyObj<RightService>('rightService', ['hasFeature']);
    routerSpy = jasmine.createSpyObj<Router>('router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: RightService, useValue: rightServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState })
      ]
    });
    guard = TestBed.inject(ComponentRightsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should have component right (with string name)', () => {

    const parameter: any = { component: 'test' };

    testScheduler.run(({ cold, expectObservable }) => {
      rightServiceSpy.hasFeature.and.returnValue(cold('a', {a: true}));

      const result = guard.canActivate(parameter);

      expectObservable(result).toBe('a', { a: true });
    });
  });

  it('should have component right (with component type)', () => {

    const parameter: any = { component: TestComponent };

    testScheduler.run(({ cold, expectObservable }) => {
      rightServiceSpy.hasFeature.and.returnValue(cold('a', {a: true}));
      const result = guard.canActivate(parameter);

      expect(rightServiceSpy.hasFeature).toHaveBeenCalledWith('TestComponent');

      expectObservable(result).toBe('a', { a: true });
    });
  });

  it('should not have component right', () => {

    const parameter: any = { component: 'test' };
    const urlTree = new UrlTree();

    testScheduler.run(({ cold, expectObservable }) => {
      rightServiceSpy.hasFeature.and.returnValue(cold('a', {a: false}));

      routerSpy.parseUrl.and.returnValue(urlTree);

      const result = guard.canActivate(parameter);

      expectObservable(result).toBe('a', {a: urlTree});
    });
  });

});
