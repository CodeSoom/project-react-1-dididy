import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',

  initialState: {
    myId: '',
    users: {},
    stream: null,
    receivingCall: false,
    caller: '',
    callerSignal: null,
    callAccepted: false,
    code: '',
  },

  reducers: {
    setMyId(state, { payload: { myId } }) {
      return {
        ...state,
        myId,
      };
    },
    setUsers(state, { payload: { users } }) {
      return {
        ...state,
        users,
      };
    },
    setStream(state, { payload: { stream } }) {
      return {
        ...state,
        stream,
      };
    },
    setReceivingCall(state, { payload: { receivingCall } }) {
      return {
        ...state,
        receivingCall,
      };
    },
    setCaller(state, { payload: { caller } }) {
      return {
        ...state,
        caller,
      };
    },
    setCallerSignal(state, { payload: { callerSignal } }) {
      return {
        ...state,
        callerSignal,
      };
    },
    setCallAccepted(state, { payload: { callAccepted } }) {
      return {
        ...state,
        callAccepted,
      };
    },
    setCode(state, { payload: { code } }) {
      return {
        ...state,
        code,
      };
    },
  },
});

export const {
  setMyId,
  setUsers,
  setStream,
  setReceivingCall,
  setCaller,
  setCallerSignal,
  setCallAccepted,
  setCode,
} = actions;

export default reducer;
