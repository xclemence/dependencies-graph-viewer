import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private _busyChanged = new BehaviorSubject<boolean>(false);
  private lastId: Guid;

  busy(): Guid {
    this.lastId = Guid.create();
    this._busyChanged.next(true);
    return this.lastId;
  }

  unbusy(id: Guid) {
    if (this.lastId !== id) {
      return;
    }

    this._busyChanged.next(false);
  }

  observe(): Observable<boolean> {
    return this._busyChanged.asObservable();
  }
}
