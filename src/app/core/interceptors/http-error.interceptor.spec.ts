import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';


describe('HttpErrorInterceptor', () => {

  const initialState = { test: false };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptor,
      provideMockStore({ initialState }),
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    const store = TestBed.inject(MockStore);
    expect(interceptor).toBeTruthy();
  });
});
