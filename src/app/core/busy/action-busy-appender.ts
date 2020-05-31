import { TypedAction } from '@ngrx/store/src/models';

export class ActionBusyAppender {

  static executeWithBusy<T extends string>(action: TypedAction<T>, key: string): TypedAction<T> {
    (action as any).busyKey = key;
    return action;
  }

  static executeWithMainBusy<T extends string>(action: TypedAction<T>): TypedAction<T> {
    return ActionBusyAppender.executeWithBusy(action, 'Main');
  }
}
