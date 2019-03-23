import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareStatisticsComponent } from './software-statistics.component';

describe('SoftwareStatisticsComponent', () => {
  let component: SoftwareStatisticsComponent;
  let fixture: ComponentFixture<SoftwareStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
