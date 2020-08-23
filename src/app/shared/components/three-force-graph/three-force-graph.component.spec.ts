import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeForceGraphComponent } from './three-force-graph.component';

describe('ThreeForceGraphComponent', () => {
  let component: ThreeForceGraphComponent;
  let fixture: ComponentFixture<ThreeForceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeForceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeForceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
