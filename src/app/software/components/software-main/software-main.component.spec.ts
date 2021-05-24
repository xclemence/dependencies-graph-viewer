import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { ActionBusyAppender } from '@app/core/busy/action-busy-appender';
import { AssemblyBase } from '@app/core/models';
import { UrlService } from '@app/core/services';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';

import { clearSoftwareAssemblies, loadSoftwareAssemblies, loadSoftwareNames } from '../../store/actions';
import { SoftwareMainComponent } from './software-main.component';

@Component({ selector: 'sft-software-list', template: '' })
class SoftwareListStubComponent {
  @Output() selectionChange: EventEmitter<AssemblyBase> = new EventEmitter();
  @Output() refreshSoftwaresRequest = new EventEmitter();

  @Input() selectedId?: string;
}

@Component({ selector: 'sft-software-references', template: '' })
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

  beforeEach(waitForAsync(() => {
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

  it('should ask for refresh software list', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    const expectedAction = ActionBusyAppender.executeWithMainBusy(loadSoftwareNames());

    component.refreshSoftwares();

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should set selected id when url parameter changed', fakeAsync(() => {
    paramMap.next(convertToParamMap({ id: '1' }));

    expect(component.selectedSoftwareId).toBe('1');
  }));

  it('should clear store if no url parameter', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    paramMap.next(convertToParamMap({}));

    expect(dispatchSpy).toHaveBeenCalledWith(clearSoftwareAssemblies());
  }));

  it('should do nothing on undefine selection', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    component.selectedSoftwareChanged(undefined);

    expect(dispatchSpy).not.toHaveBeenCalled();
  }));

  it('should ask to load selected item', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    const softwareId = '1';
    const expectedAction = ActionBusyAppender.executeWithBusy(loadSoftwareAssemblies({ assemblyId: softwareId }), 'SelectedSoftware');


    component.selectedSoftwareChanged(softwareId);

    expect(urlServiceSpy.replaceSegment).toHaveBeenCalledWith(1, softwareId, TestBed.inject(ActivatedRoute));
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  }));
});
