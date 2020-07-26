import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { busyStateSelector } from '@app/core/store/core.selectors';
import { BusyState, CoreState } from '@app/core/store/models';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BusyComponent } from './busy.component';

describe('BusyComponent', () => {
  let component: BusyComponent;
  let fixture: ComponentFixture<BusyComponent>;
  let mockBusySelector: MemoizedSelector<CoreState, BusyState>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [BusyComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    mockBusySelector = mockStore.overrideSelector(
      busyStateSelector,
      { actionsInProgress: [ ] }
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update opacity', () => {
    component.opacity = 0.3;
    fixture.detectChanges();

    const backgroundElement = fixture.debugElement.query(By.css('.background-busy')).nativeElement;

    expect(backgroundElement.style.opacity).toBe('0.3');
  });

  it('should update message', () => {
    const message = 'New Loading message';
    component.message = message;
    fixture.detectChanges();

    const backgroundElement = fixture.debugElement.query(By.css('.busy-text')).nativeElement;

    expect(backgroundElement.innerHTML.trim()).toBe(message);
  });

  it('should update visibility', () => {
    component.displayed = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).not.toContain('collapse');
  });

  it('should not visible', () => {
    expect(fixture.nativeElement.classList).toContain('collapse');
  });

  it('should display busy when state contain busy key', () => {
    component.busyKey = 'testKey';
    mockBusySelector.setResult({ actionsInProgress: [ 'testKey' ] });
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).not.toContain('collapse');
  });

  it('should mask busy when state not contain busy key', () => {
    component.displayed = true;
    component.busyKey = 'testKey';
    fixture.detectChanges();

    mockBusySelector.setResult({ actionsInProgress: [ ] });
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).toContain('collapse');
  });

  it('should mask busy when state not contain busy key', () => {
    component.displayed = true;
    component.busyKey = 'testKey';
    fixture.detectChanges();

    mockBusySelector.setResult({ actionsInProgress: [ ] });
    mockStore.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList).toContain('collapse');
  });

});
