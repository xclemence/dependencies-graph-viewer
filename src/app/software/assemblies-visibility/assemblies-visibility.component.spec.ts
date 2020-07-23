import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NameFilterPipe } from '@app/shared/pipe/name-filter.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AssembliesVisibilityComponent } from './assemblies-visibility.component';

describe('SoftwareAssembliesComponent', () => {
  let component: AssembliesVisibilityComponent;
  let fixture: ComponentFixture<AssembliesVisibilityComponent>;
  const initialState = {
    software: {
      assemblies: {
        software: { },
        filteredAssemblies: []
      },
      name: {
        softwareNames: []
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule
      ],
      declarations: [
        AssembliesVisibilityComponent,
        NameFilterPipe
      ],
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

  it('should create', () => {
    const store = TestBed.inject(MockStore);

    expect(component).toBeTruthy();
  });
});
