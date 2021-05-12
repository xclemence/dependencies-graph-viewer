import { TypedAction } from '@ngrx/store/src/models';

import { ActionBusyAppender } from './action-busy-appender';

class TestAction implements TypedAction<string> {
  type = 'test';
}

describe('ActionBusyAppender', () => {

  it('add Main busy key', () => {

    const action = new TestAction();
    ActionBusyAppender.executeWithMainBusy(action);
    const notTypedAction = action as any;

    expect(notTypedAction.busyKey).toBe('Main');
  });

  it('add specific busy key', () => {

    const action = new TestAction();
    ActionBusyAppender.executeWithBusy(action, 'testKey');
    const notTypedAction = action as any;

    expect(notTypedAction.busyKey).toBe('testKey');
  });

});
