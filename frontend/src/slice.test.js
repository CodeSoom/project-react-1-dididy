import reducer, {
  setMyId,
  setUsers,
  setStream,
  setReceivingCall,
  setCaller,
  setCallerSignal,
  setCallAccepted,
  setCode,
} from './slice';

import STREAM from '../fixtures/stream';
import CALLER_SIGNAL from '../fixtures/callerSignal';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      myId: '',
      users: {},
      stream: null,
      receivingCall: false,
      caller: '',
      callerSignal: null,
      callAccepted: false,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setMyId', () => {
    it('changes myId', () => {
      const initialState = {
        myId: '',
      };

      const myId = 'test';

      const state = reducer(initialState, setMyId({ myId }));

      expect(state.myId).toEqual(myId);
    });
  });

  describe('setUsers', () => {
    it('changes users', () => {
      const initialState = {
        users: {},
      };

      const users = {
        test1: 'test1',
        test2: 'test2',
      };

      const state = reducer(initialState, setUsers({ users }));

      expect(state.users).toEqual(users);
    });
  });

  describe('setStream', () => {
    it('changes stream', () => {
      const initialState = {
        stream: null,
      };

      const state = reducer(initialState, setStream({ stream: STREAM }));

      expect(state.stream).toEqual(STREAM);
    });
  });

  describe('setReceivingCall', () => {
    it('changes receivingCall', () => {
      const initialState = {
        receivingCall: false,
      };

      const receivingCall = true;

      const state = reducer(initialState, setReceivingCall({ receivingCall }));

      expect(state.receivingCall).toEqual(receivingCall);
    });
  });

  describe('setCaller', () => {
    it('changes caller', () => {
      const initialState = {
        caller: '',
      };

      const caller = 'test';

      const state = reducer(initialState, setCaller({ caller }));

      expect(state.caller).toEqual(caller);
    });
  });

  describe('setCallerSignal', () => {
    it('changes callerSignal', () => {
      const initialState = {
        callerSignal: null,
      };

      const state = reducer(initialState, setCallerSignal({ callerSignal: CALLER_SIGNAL }));

      expect(state.callerSignal).toEqual(CALLER_SIGNAL);
    });
  });

  describe('setCallAccepted', () => {
    it('changes callAccepted', () => {
      const initialState = {
        callAccepted: false,
      };

      const callAccepted = true;

      const state = reducer(initialState, setCallAccepted({ callAccepted }));

      expect(state.callAccepted).toEqual(callAccepted);
    });
  });

  describe('setCode', () => {
    it('changes code', () => {
      const initialState = {
        code: '',
      };

      const code = 'test';

      const state = reducer(initialState, setCode({ code }));

      expect(state.callAccepted).toEqual(code);
    });
  });
});
