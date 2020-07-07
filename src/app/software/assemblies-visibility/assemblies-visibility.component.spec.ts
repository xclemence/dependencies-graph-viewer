import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NameFilterPipe } from '@app/shared/pipe/name-filter.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AssembliesVisibilityComponent } from './assemblies-visibility.component';


describe('SoftwareAssembliesComponent', () => {
  let component: AssembliesVisibilityComponent;
  let fixture: ComponentFixture<AssembliesVisibilityComponent>;
  const initialState = { assemblies: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssembliesVisibilityComponent, NameFilterPipe],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembliesVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    const store = TestBed.inject(MockStore);

    expect(component).toBeTruthy();
  });
});
