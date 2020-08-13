import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setPairUserId,
  setCallAccepted,
  setCode,
  connectSocket,
  callTo,
  acceptUserCall,
} from '../../slice';

import { get } from '../../utils';

import {
  MainSidebarWrapper,
  WebcamContainerWrapper,
  IncomingCallPopUp,
  PopUp,
} from './style';

export default function MainSidebar({ tunnel, setTunnel, history }) {
  const dispatch = useDispatch();

  const myId = useSelector(get('myId'));
  const receivingCall = useSelector(get('receivingCall'));
  const caller = useSelector(get('caller'));
  const callerSignal = useSelector(get('callerSignal'));
  const callAccepted = useSelector(get('callAccepted'));

  const [stream, setStream] = useState(null);

  const code = useSelector(get('code'));
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  function acceptCall() {
    dispatch(acceptUserCall());
  }

  useEffect(() => {
    dispatch(connectSocket());

    const pairUserId = history.location.pathname.replace('/', '');
    if (pairUserId) {
      // call to other person
      setTimeout(() => {
        dispatch(callTo(pairUserId));
      }, 3000);
      // dispatch(setPairUserId(pairUserId));
    }

    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((requestStream) => {
    //     setStream(requestStream);
    //     if (userVideo.current) {
    //       userVideo.current.srcObject = requestStream;
    //     }
    //   });
  }, []);

  // useEffect(() => {
  //   if (tunnel) {
  //     tunnel.on('data', (data) => {
  //       dispatch(setCode({ code: String(data) }));
  //     });
  //   }
  // }, [code]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     callPeer(history.location.pathname.replace('/', ''));
  //   }, 3000);
  // }, [myId]);

  const IncomingCall = (
    <IncomingCallPopUp>
      <PopUp>
        <h1>{caller} is calling you</h1>
        <button type="button" onClick={acceptCall}>
          Accept
        </button>
      </PopUp>
    </IncomingCallPopUp>
  );

  const ConnectedIndicator = <div>Connected with {caller}</div>;

  const renderByCallStatus = receivingCall ? IncomingCall : '';

  const UserVideo = <video playsInline muted ref={userVideo} autoPlay />;

  const PartnerVideo = <video playsInline muted ref={partnerVideo} autoPlay />;

  return (
    <MainSidebarWrapper>
      <div>
        ID: {myId}
        {window.location.href.includes('localhost:8080') ? (
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(`localhost:8080/${myId}`)
            }
            disabled={callAccepted}
          >
            {' '}
            초대링크 복사
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(`pair-with.netlify.app/${myId}`)
            }
            disabled={callAccepted}
          >
            {' '}
            초대링크 복사
          </button>
        )}
      </div>
      {callAccepted ? ConnectedIndicator : renderByCallStatus}
      <WebcamContainerWrapper>
        {stream ? UserVideo : ''}
        {callAccepted ? PartnerVideo : ''}
      </WebcamContainerWrapper>
    </MainSidebarWrapper>
  );
}
