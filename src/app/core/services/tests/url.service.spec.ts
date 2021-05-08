import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Page1Component, Page2Component, PageMainComponent } from '@app/test/router-test';

import { LoggerService } from '../logger.service';
import { UrlService } from '../url.service';


const routes: Routes = [
  {
    path: 'test', component: PageMainComponent,
    children: [
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component }
  ] },
];

describe('UrlService', () => {
  let service: UrlService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        LoggerService,
        UrlService,
        {provide: ActivatedRoute, useValue: { outlet: 'primary' }}
      ]
    });
    service = TestBed.inject(UrlService);
    router = TestBed.inject(Router);
  });

  it('provide current location', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();

    const path = service.getCurrentPath();
    expect(path).toBe('/test/page1');
  }));

  it('change current location', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();

    service.moveSegment('hello-test');

    const path = service.getCurrentPath();
    expect(path).toBe('/hello-test');
  }));

  it('append fake location', fakeAsync(() => {
    router.navigate(['test']);
    tick();

    service.replaceSegment(1, 'hello-test', TestBed.inject(ActivatedRoute));

    const path = service.getCurrentPath();
    expect(path).toBe('/test/hello-test');
  }));

  it('replace fake location', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();

    service.replaceSegment(1, 'hello-test', TestBed.inject(ActivatedRoute));

    const path = service.getCurrentPath();
    expect(path).toBe('/test/hello-test');
  }));

  it('remove last url part', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();
    const activatedRoute = TestBed.inject(ActivatedRoute);

    service.removeAt(1, activatedRoute);

    const path = service.getCurrentPath();
    expect(path).toBe('/test');
  }));

  it('remove first url part', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();
    const activatedRoute = TestBed.inject(ActivatedRoute);

    service.removeAt(0, activatedRoute);

    const path = service.getCurrentPath();
    expect(path).toBe('/page1');
  }));

  it('not remove url element, index to big', fakeAsync(() => {
    router.navigate(['test', 'page1']);
    tick();
    const activatedRoute = TestBed.inject(ActivatedRoute);

    service.removeAt(10, activatedRoute);

    const path = service.getCurrentPath();
    expect(path).toBe('/test/page1');
  }));

});
