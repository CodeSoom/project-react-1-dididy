import React, { useEffect, useState, useRef } from 'react';

import io from 'socket.io-client';
import Peer from 'simple-peer';

import { MainSidebarWrapper, ButtonWrapper, WebcamContainerWrapper } from './MainSidebar.style';

export default function MainSidebar() {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect('https://pair-with.herokuapp.com/');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((requestStream) => {
        setStream(requestStream);
        if (userVideo.current) {
          userVideo.current.srcObject = requestStream;
        }
      });

    socket.current.on('yourID', (id) => {
      setYourID(id);
    });
    socket.current.on('allUsers', (requestUsers) => {
      setUsers(requestUsers);
    });

    socket.current.on('hey', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    setCaller(id);
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

    peer.on('signal', (data) => {
      socket.current.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on('stream', (requestStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = requestStream;
      }
    });

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
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

  const renderByCallStatus = (receivingCall ? IncomingCall : '');

  const UserVideo = <video playsInline muted ref={userVideo} autoPlay />;

  const PartnerVideo = <video playsInline muted ref={partnerVideo} autoPlay />;

  return (
    <MainSidebarWrapper>
      <div>
        MainSidebar
        <br />
        My id:
        {' '}
        {yourID}
      </div>
      {Object.keys(users).map((key) => {
        if (key === yourID) {
          return null;
        }
        return (
          <ButtonWrapper key={key} type="button" onClick={() => callPeer(key)} toggle={callAccepted}>
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
