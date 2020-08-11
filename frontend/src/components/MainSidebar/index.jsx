import React, { useEffect, useRef, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import {
  setMyId,
  setUsers,
  // setStream,
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
  IncomingCallPopUp,
  PopUp,
} from './style';

export default function MainSidebar({ tunnel, setTunnel, history }) {
  const dispatch = useDispatch();

  const myId = useSelector(get('myId'));
  const users = useSelector(get('users'));
  // const stream = useSelector(get('stream'));
  const receivingCall = useSelector(get('receivingCall'));
  const caller = useSelector(get('caller'));
  const callerSignal = useSelector(get('callerSignal'));
  const callAccepted = useSelector(get('callAccepted'));

  const [stream, setStream] = useState(null);

  const code = useSelector(get('code'));
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  function callPeer(id) {
    setTimeout(
      () => {
        dispatch(setCaller({ caller: id }));
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
            iceServers: [
              { url: 'stun:stun.l.google.com:19302' },
              // {
              //   urls: 'stun:numb.viagenie.ca',
              //   username: 'sultan1640@gmail.com',
              //   credential: '98376683',
              // },
              // {
              //   url: 'turn:numb.viagenie.ca',
              //   credential: 'muazkh',
              //   username: 'webrtc@live.com',
              // },
            ],
          },
          stream,
        });
        setTunnel(peer);
        console.log(peer);
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
      }, 3000,
    );
  }

  function acceptCall() {
    setTimeout(
      () => {
        dispatch(setCallAccepted({ callAccepted: true }));
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
        });

        setTunnel(peer);

        peer.on('signal', (data) => {
          console.log('data', data)
          socket.current.emit('acceptCall', { signal: data, to: caller });
        });

        peer.on('stream', (requestStream) => {
          partnerVideo.current.srcObject = requestStream;
        });

        peer.signal(callerSignal);
      }, 1000,
    );
  }

  useEffect(() => {
    socket.current = io.connect('https://pair-with.herokuapp.com/');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((requestStream) => {
        // dispatch(setStream({ stream: requestStream }));
        setStream(requestStream);
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
      console.log('callerSignal', callerSignal, data.signal);
    });
  }, []);

  useEffect(() => {
    if (tunnel) {
      tunnel.on('data', (data) => {
        dispatch(setCode({ code: String(data) }));
      });
    }
  }, [code]);

  useEffect(() => {
    callPeer(history.location.pathname.replace('/', ''));
  }, [myId]);

  const IncomingCall = (
    <IncomingCallPopUp>
      <PopUp>
        <h1>
          {caller}
          {' '}
          is calling you
        </h1>
        <button type="button" onClick={acceptCall}>
          Accept
        </button>
      </PopUp>
    </IncomingCallPopUp>
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
        ID:
        {' '}
        {myId}
        {window.location.href.includes('localhost:8080') ? (
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(`localhost:8080/${myId}`)}
            disabled={callAccepted}
          >
            {' '}
            초대링크 복사
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(`pair-with.netlify.app/${myId}`)}
            disabled={callAccepted}
          >
            {' '}
            초대링크 복사
          </button>
        )}
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
