import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { currentUserSelector, featuresRightsSelector } from '../store/security.selectors';

import { RightService } from './right.service';
import { ConfigurationService } from '@app/core/services/configuration.service';
import { ConfigurationServiceMock } from '@app/core/services/configuration.service.mock';

const initialState = {
  security: { },
};

describe('RightService', () => {
  let service: RightService;
  let mockStore: MockStore;
  let testScheduler: TestScheduler;
  let configService: ConfigurationService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {provide : ConfigurationService, useClass: ConfigurationServiceMock }
      ]
    });
    service = TestBed.inject(RightService);
    mockStore = TestBed.inject(MockStore);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have right with security disabled', () => {
    configService.configuration.security.enabled = false;
    testScheduler.run(({ expectObservable }) => {
      const result = service.hasFeature('test');
      expectObservable(result).toBe('(a|)', { a: true });
    });
  });

  it('should not have right (no user and no feature)', () => {
    configService.configuration.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {
      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });


  it('should not have right (no user)', () => {
    configService.configuration.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, []);

      featuresRightsSelectorMock.setResult([
        { name: 'test ', rights: ['right'] }
      ]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

  it('should not have right (no feature)', () => {
    configService.configuration.security.enabled = true;
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
    configService.configuration.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, []);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: true });
    });
  });

  it('should not have right (bad right)', () => {
    configService.configuration.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, []);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right2'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

  it('should not have right (missing right)', () => {
    configService.configuration.security.enabled = true;
    testScheduler.run(({ expectObservable }) => {

      const currentUserSelectorMock = mockStore.overrideSelector(currentUserSelector, undefined);
      const featuresRightsSelectorMock = mockStore.overrideSelector(featuresRightsSelector, []);

      currentUserSelectorMock.setResult({ name: 'user', rights: ['right'] });
      featuresRightsSelectorMock.setResult([{ name: 'test', rights: ['right', 'right2'] }]);

      mockStore.refreshState();

      const result = service.hasFeature('test');
      expectObservable(result).toBe('a', { a: false });
    });
  });

});
