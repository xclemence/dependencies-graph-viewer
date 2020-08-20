import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { snowStateSelector } from '@app/core/store/core.selectors';
import { CoreState, SnowState } from '@app/core/store/models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SnowDialogDirective } from './snow-dialog.directive';

@Component({
  template: '<div class="test" appSnowDialog ></div>'
})
export class TestComponent { }

const initialState = {
  core: {
    snow: { activated: false },
  }
};

describe('SnowDialogDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let mockStore: MockStore;
  let snowSelectorMock: MemoizedSelector<CoreState, SnowState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SnowDialogDirective],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);

    snowSelectorMock = mockStore.overrideSelector(snowStateSelector, { activated: false });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not displayed', () => {
    const element = fixture.debugElement.query(By.css('div'));
    expect(element.classes['snow-dialog']).toBeFalsy();
  });

  fit('should display snow mode', fakeAsync(() => {
    snowSelectorMock.setResult({ activated: true });
    mockStore.refreshState();

    fixture.detectChanges();
    flush();

    const element = fixture.debugElement.query(By.css('div'));
    expect(element.classes['snow-dialog']).toBeTruthy();
  }));
});
