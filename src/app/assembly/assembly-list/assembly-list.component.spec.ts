import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Assembly } from '@app/core/models';
import { UrlService } from '@app/core/services';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { AssemblyService } from '../services/assembly.service';
import { SortDefinitionConvertorService } from '../services/sort-definition-convertor.service';
import { assemblyDepthStateSelector } from '../store/assembly.selectors';
import { AssemblyState } from '../store/models';
import { AssemblyListComponent } from './assembly-list.component';

const initialState = {
  assembly: {
    assemblies: {
      filtered: undefined,
      count: 0
    }
  },
  core: {
    busy: {
      actionsInProgress: []
    }
  }
};

describe('AssemblyListComponent', () => {
  let component: AssemblyListComponent;
  let fixture: ComponentFixture<AssemblyListComponent>;
  let mockAssemblyDepthSelector: MemoizedSelector<AssemblyState, Assembly>;
  let mockStore: MockStore;
  const assemblyServiceSpy = jasmine.createSpyObj<AssemblyService>('service', ['remove']);
  const convertorServiceSpy = jasmine.createSpyObj<SortDefinitionConvertorService>('serviceConvertor', ['getAssemblyServiceOrder']);
  const urlServiceSpy = jasmine.createSpyObj<UrlService>('urlService', ['replaceSegment', 'removeAt']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule
      ],
      declarations: [AssemblyListComponent],
      providers: [
        { provide: AssemblyService, useValue: assemblyServiceSpy },
        { provide: SortDefinitionConvertorService, useValue: convertorServiceSpy },
        { provide: UrlService, useValue: urlServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ id: 123 })),

          }
        },
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);

    mockAssemblyDepthSelector = mockStore.overrideSelector(assemblyDepthStateSelector, undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
