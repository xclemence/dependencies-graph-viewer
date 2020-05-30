import 'reflect-metadata';

export const busyIndicatorMetadataKey = Symbol('BusyIndicatorKey');

export interface BusyMetaData {
  key: string;
}

export function getBusyMetaData(target: any): BusyMetaData {
  const item = Reflect.getMetadata(busyIndicatorMetadataKey, target.constructor);
  console.log(`Get busy Metadata ${JSON.stringify(item)}`);
  return item;
}