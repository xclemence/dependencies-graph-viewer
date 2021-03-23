import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';

import { StateButtonComponent } from './state-button.component';

describe('StateButtonComponent', () => {
  let component: StateButtonComponent;
  let fixture: ComponentFixture<StateButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StateButtonComponent],
      imports: [
        MatButtonModule,
        MatTooltipModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new value', () => {
    const emitSpy = spyOn(component.valueChange, 'emit');
    component.onClick();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should return undefined color', () => {
    expect(component.buttonColor).toBeUndefined();
  });

  it('should return primary color', () => {
    component.value = true;
    expect(component.buttonColor).toEqual('primary');
  });

  it('should selected css class', fakeAsync(() => {
    component.value = true;

    fixture.detectChanges();

    const item = fixture.debugElement.query(By.css('.button-selected'));

    expect(item).toBeTruthy();
  }));

});
