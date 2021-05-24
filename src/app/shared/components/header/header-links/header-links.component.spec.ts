import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { currentUserSelector } from '@app/security/store/security.selectors';
import { PageMainComponent } from '@app/test/router-test';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { HeaderLinksComponent } from './header-links.component';

const initialState = {
  security: {
    currentUser: { activated: false },
  }
};

describe('HeaderLinksComponent', () => {
  let component: HeaderLinksComponent;
  let fixture: ComponentFixture<HeaderLinksComponent>;
  let mockStore: MockStore;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderLinksComponent],
      providers: [
        provideMockStore({ initialState })
      ],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'test', component: PageMainComponent}]),
        MatTabsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only paths with no role', () => {

    testScheduler.run(({ expectObservable }) => {

      const pathNoRole = { path: 'path-no role', label: 'test', roles: [] };
      component.allLinks = [
        pathNoRole,
        { path: 'path', label: 'test', roles: ['test'] },
        { path: 'path2', label: 'test2', roles: ['test2', 'test3'] }
      ];

      if (!component.userLinks) {
        fail('userLinks should not be undefined');
      } else {
        expectObservable(component.userLinks).toBe('a', { a: [pathNoRole] });
      }
    });
  });

  it('should display only paths according with user rights', fakeAsync(() => {

    testScheduler.run(({ expectObservable }) => {
      const userSelector = mockStore.overrideSelector(currentUserSelector, undefined);


      const pathNoRole = { path: 'path-no role', label: 'test', roles: [] };
      const pathWithRole = { path: 'path2', label: 'test2', roles: ['test2', 'test3'] };
      component.allLinks = [
        pathNoRole,
        { path: 'path', label: 'test', roles: ['test'] },
        pathWithRole
      ];

      userSelector.setResult({
        name: 'user',
        rights: ['test2', 'test3']
      });
      mockStore.refreshState();
      fixture.detectChanges();

      if (!component.userLinks) {
        fail('userLinks should not be undefined');
      } else {
        expectObservable(component.userLinks).toBe('a', { a: [pathNoRole, pathWithRole] });
      }
    });
  }));

});
