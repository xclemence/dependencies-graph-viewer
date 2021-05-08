import { TestBed } from '@angular/core/testing';
import { currentUserSelector, featuresRightsSelector } from '@app/core/store/core.selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { environment } from 'environments/environment';
import { TestScheduler } from 'rxjs/testing';

import { RightService } from './right.service';

const initialState = {
  core: {
    security: { },
  }
};

describe('RightService', () => {
  let service: RightService;
  let mockStore: MockStore;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(RightService);
    mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have right with security disabled', () => {
    environment.security.enabled = false;
    testScheduler.run(({ expectObservable }) => {
      const result = service.hasFeature('test');
      expectObservable(result).toBe('(a|)', { a: true });
    });
  });

  it('should not have right (no user and no feature)', () => {
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {
      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });


  it('should not have right (no user)', () => {
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, undefined);

      featuresRightsSelectorMock.setResult([
        { name: 'test ', rights: ['right'] }
      ]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

  it('should not have right (no feature)', () => {
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);

      currentUserSelectorMock.setResult({
        name: 'user', rights: ['right']
      });

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

  it('should have right', () => {
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, undefined);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: true });
    });
  });

  it('should not have right (bad right)', () => {
    environment.security.enabled = true;
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, undefined);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right2'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

  it('should not have right (missing right)', () => {
    environment.security.enabled = true;
    environment.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, undefined);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right', 'right2'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

});
