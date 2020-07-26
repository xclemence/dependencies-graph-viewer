import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';

import { HeaderPreviousComponent } from './header-previous.component';

describe('HeaderPreviousComponent', () => {
  let component: HeaderPreviousComponent;
  let fixture: ComponentFixture<HeaderPreviousComponent>;
  let loader: HarnessLoader;
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
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location back method on back', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();

    expect(locationSpy.back).toHaveBeenCalled();
  });
});
