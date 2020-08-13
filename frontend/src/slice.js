import { createSlice } from '@reduxjs/toolkit';

import io from 'socket.io-client';
import Peer from 'simple-peer';

let socket;
let peer;

const { actions, reducer } = createSlice({
  name: 'application',

  initialState: {
    myId: '',
    users: {},
    receivingCall: false,
    caller: '',
    callerSignal: null,
    callAccepted: false,
    code: '',
    socket: null,
    stream: null,
    peer: null,
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
    setPeer(state, { payload: { peer } }) {
      return {
        ...state,
        peer,
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
  setPeer,
} = actions;

export const connectSocket = () => (dispatch, getState) => {
  if (socket) {
    return;
  }

  const { stream, peer, myId } = getState();

  socket = io.connect('https://pair-with.herokuapp.com/');
  socket.on('myId', (id) => {
    dispatch(setMyId({ myId: id }));
  });

  socket.on('allUsers', (requestUsers) => {
    console.log('allUsers is called');
    dispatch(setUsers({ users: requestUsers }));
  });

  socket.on('hey', (data) => {
    console.log('hey is called');
    dispatch(setReceivingCall({ receivingCall: true }));
    dispatch(setCaller({ caller: data.from }));
    dispatch(setCallerSignal({ callerSignal: data.signal }));
  });

  socket.on('callAccepted', (signal) => {
    console.log('callAccepted is called', signal);
    dispatch(setCallAccepted({ callAccepted: true }));
    peer.signal(signal);
  });
};

export const callTo = (otherPersonId) => (dispatch, getState) => {
  const { stream, myId } = getState();
  const p = new Peer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
    },
    stream,
  });

  p.on('signal', (data) => {
    console.log('signal is called');
    socket.emit('callUser', {
      userToCall: otherPersonId,
      signalData: data,
      from: myId,
    });
  });

  p.on('stream', (requestStream) => {
    // if (partnerVideo.current) {
    //   partnerVideo.current.srcObject = requestStream;
    // }
  });

  peer = p;
  
  console.log('callTo p: ', p);
};

export const acceptUserCall = () => (dispatch, getState) => {
  const { stream, caller, callerSignal } = getState();

  dispatch(setCallAccepted({ callAccepted: true }));

  const p = new Peer({
    initiator: false,
    trickle: false,
    config: {
      iceServers: [{ url: 'stun:stun.l.google.com:19302' }],
    },
    stream,
  });

  p.on('signal', (data) => {
    socket.emit('acceptCall', { signal: data, to: caller });
  });

  p.on('stream', (requestStream) => {
    // partnerVideo.current.srcObject = requestStream;
  });

  p.signal(callerSignal);

  console.log('acceptUserCall p: ', p);
  peer = p;
};

export const sendToUser = (text) => (dispatch, getState) => {
  peer.send(text);
};

export default reducer;
