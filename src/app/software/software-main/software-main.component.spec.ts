import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssemblyBase } from '@app/core/models';
import { UrlService } from '@app/core/services';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';

import { SoftwareMainComponent } from './software-main.component';

@Component({selector: 'app-software-list', template: ''})
class SoftwareListStubComponent {
  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();
  @Output() refreshSoftwaresRequest = new EventEmitter();

  @Input() selectedId: string;
}

@Component({selector: 'app-software-references', template: ''})
class SoftwareReferencesStubComponent { }

describe('SoftwareMainComponent', () => {
  let component: SoftwareMainComponent;
  let fixture: ComponentFixture<SoftwareMainComponent>;
  let mockStore: MockStore;
  let urlServiceSpy: jasmine.SpyObj<UrlService>;
  let paramMap: Subject<ParamMap>;

  const initialState = {
    software: {
      assemblies: {
        software: {},
        filteredAssemblies: []
      },
      name: {
        softwareNames: []
      }
    }
  };

  beforeEach(async(() => {
    paramMap = new Subject<ParamMap>();
    urlServiceSpy = jasmine.createSpyObj<UrlService>('urlService', ['replaceSegment', 'removeAt']);

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatListModule,
        FormsModule,
      ],
      declarations: [
        SoftwareMainComponent,
        SoftwareListStubComponent,
        SoftwareReferencesStubComponent
      ],
      providers: [
        { provide: UrlService, useValue: urlServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: paramMap.asObservable() } },
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SoftwareMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
