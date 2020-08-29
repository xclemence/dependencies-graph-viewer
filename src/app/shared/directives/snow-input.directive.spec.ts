import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { snowActivation } from '@app/core/store/actions/snow.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SnowInputDirective } from './snow-input.directive';

@Component({
  template: '<input dgvSnowInput>'
})
export class TestComponent { }

describe('SnowInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SnowInputDirective],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create component with directive', () => {
    expect(component).toBeTruthy();
  });

  it('should active snow mode', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const searchElements = fixture.debugElement.query(By.css('input'));
    const expectedAction = snowActivation();

    searchElements.nativeElement.value = 'pantoufl';
    searchElements.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));

    flush();

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  }));

  it('should not active snow mode', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const searchElements = fixture.debugElement.query(By.css('input'));

    searchElements.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));

    flush();

    expect(dispatchSpy).not.toHaveBeenCalled();
  }));

});

