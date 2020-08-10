import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import {
  setMyId,
  setUsers,
  setStream,
  setReceivingCall,
  setCaller,
  setCallerSignal,
  setCallAccepted,
  setCode,
} from '../../slice';

import { get } from '../../utils';

import {
  MainSidebarWrapper,
  ButtonWrapper,
  WebcamContainerWrapper,
} from './style';

export default function MainSidebar({ tunnel, setTunnel }) {
  const dispatch = useDispatch();

  const myId = useSelector(get('myId'));
  const users = useSelector(get('users'));
  const stream = useSelector(get('stream'));
  const receivingCall = useSelector(get('receivingCall'));
  const caller = useSelector(get('caller'));
  const callerSignal = useSelector(get('callerSignal'));
  const callAccepted = useSelector(get('callAccepted'));
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect('https://pair-with.herokuapp.com/');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((requestStream) => {
        dispatch(setStream({ stream: requestStream }));
        if (userVideo.current) {
          userVideo.current.srcObject = requestStream;
        }
      });

    socket.current.on('myId', (id) => {
      dispatch(setMyId({ myId: id }));
    });
    socket.current.on('allUsers', (requestUsers) => {
      dispatch(setUsers({ users: requestUsers }));
    });

    socket.current.on('hey', (data) => {
      dispatch(setReceivingCall({ receivingCall: true }));
      dispatch(setCaller({ caller: data.from }));
      dispatch(setCallerSignal({ callerSignal: data.signal }));
    });
  }, []);

  useEffect(() => {
    if (tunnel) {
      tunnel.on('data', (data) => {
        dispatch(setCode({ code: data }));
      });
    }
  }, [tunnel]);

  function callPeer(id) {
    dispatch(setCaller({ caller: id }));
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
          {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
          },
        ],
      },
      stream,
    });

    setTunnel(peer);

    peer.on('signal', (data) => {
      socket.current.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: myId,
      });
    });

    peer.on('stream', (requestStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = requestStream;
      }
    });

    socket.current.on('callAccepted', (signal) => {
      dispatch(setCallAccepted({ callAccepted: true }));
      peer.signal(signal);
    });
  }

  function acceptCall() {
    dispatch(setCallAccepted({ callAccepted: true }));
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    setTunnel(peer);

    peer.on('signal', (data) => {
      socket.current.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (requestStream) => {
      partnerVideo.current.srcObject = requestStream;
    });

    peer.signal(callerSignal);
  }

  const IncomingCall = (
    <div>
      <h1>
        {caller}
        is calling you
      </h1>
      <button type="button" onClick={acceptCall}>
        Accept
      </button>
    </div>
  );

  const ConnectedIndicator = (
    <div>
      Connected with
      {' '}
      {caller}
    </div>
  );

  const renderByCallStatus = receivingCall ? IncomingCall : '';

  const UserVideo = <video playsInline muted ref={userVideo} autoPlay />;

  const PartnerVideo = <video playsInline muted ref={partnerVideo} autoPlay />;

  return (
    <MainSidebarWrapper>
      <div>
        MainSidebar
        <br />
        My id:
        {' '}
        {myId}
      </div>
      {Object.keys(users).map((key) => {
        if (key === myId) {
          return null;
        }
        return (
          <ButtonWrapper
            key={key}
            type="button"
            onClick={() => callPeer(key)}
            toggle={callAccepted}
          >
            Call to
            {' '}
            {key}
          </ButtonWrapper>
        );
      })}
      {callAccepted ? ConnectedIndicator : renderByCallStatus}
      <WebcamContainerWrapper>
        {stream ? UserVideo : ''}
        {callAccepted ? PartnerVideo : ''}
      </WebcamContainerWrapper>
    </MainSidebarWrapper>
  );
}
