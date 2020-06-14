import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembliesVisibilityComponent } from './assemblies-visibility.component';


describe('SoftwareAssembliesComponent', () => {
  let component: AssembliesVisibilityComponent;
  let fixture: ComponentFixture<AssembliesVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssembliesVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembliesVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
