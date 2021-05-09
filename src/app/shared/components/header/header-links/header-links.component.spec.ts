import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentUserState, SecurityState } from '@app/security/store/models';
import { currentUserSelector } from '@app/security/store/security.selectors';
import { MemoizedSelector } from '@ngrx/store';
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
  let userSelector: MemoizedSelector<SecurityState, CurrentUserState>;
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
        RouterTestingModule,
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
    userSelector = mockStore.overrideSelector(currentUserSelector, undefined);
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

      expectObservable(component.userLinks).toBe('a', { a: [pathNoRole] });
    });
  });

  it('should display only paths according with user rights', fakeAsync(() => {

    testScheduler.run(({ expectObservable }) => {
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


      expectObservable(component.userLinks).toBe('a', { a: [pathNoRole, pathWithRole] });
    });
  }));

});
