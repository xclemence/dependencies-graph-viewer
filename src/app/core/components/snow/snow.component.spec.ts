import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { snowStateSelector } from '@app/core/store/core.selectors';
import { CoreState, SnowState } from '@app/core/store/models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SnowComponent } from './snow.component';

describe('SnowComponent', () => {
  let component: SnowComponent;
  let fixture: ComponentFixture<SnowComponent>;
  let mockStore: MockStore;
  let snowSelectorMock: MemoizedSelector<CoreState, SnowState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);

    snowSelectorMock = mockStore.overrideSelector(snowStateSelector, { activated: false });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not displayed', () => {
    expect(fixture.nativeElement.childElementCount).toBe(0);
  });

  it('should display snow mode', () => {
    snowSelectorMock.setResult({ activated: true });
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.childElementCount).toBe(1);

  });
});
