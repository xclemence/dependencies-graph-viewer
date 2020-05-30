import { getBusyMetaData } from '@app/core/models/busy-metadata';
import { TypedAction } from '@ngrx/store/src/models';
import { busyIndicatorMetadataKey, BusyMetaData } from '../models/busy-metadata';
import 'reflect-metadata';

declare global {
  export interface Object {
    executeWithBusy<T extends string>(key: string): TypedAction<T>;
    executeWithMainBusy<T extends string>(): TypedAction<T>;
  }
}

function executeWithBusy<T extends string >(action: any, key: string): TypedAction<T>  {
  action.busyKey = key;

  return action;
}

function executeWithMainBusy<T extends string>(action: TypedAction<T>): TypedAction<T>  {
  return executeWithBusy(action, 'Main');
}

Object.prototype.executeWithBusy = function(x: string) {
  return executeWithBusy(this, x);
};

Object.prototype.executeWithMainBusy = function() {
  return executeWithMainBusy(this);
};
