import { MatIconModule } from '@angular/material/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderPreviousComponent } from './header-previous.component';
import { Location } from '@angular/common';

describe('HeaderPreviousComponent', () => {
  let component: HeaderPreviousComponent;
  let fixture: ComponentFixture<HeaderPreviousComponent>;
  const locationSpy = jasmine.createSpyObj<Location>('location', ['back']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      providers: [
        { provide: Location, useValue: locationSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPreviousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location back method on back', () => {
    const button = fixture.debugElement.query(By.css('#backButton'));
    button.nativeElement.click();

    expect(locationSpy.back).toHaveBeenCalled();
  });
});
