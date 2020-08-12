import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { ControlledEditor } from '@monaco-editor/react';

import { setCode } from '../../slice';

import { MainContentWrapper } from './style';

import { get } from '../../utils';

export default function MainContent({ tunnel }) {
  const dispatch = useDispatch();

  const code = useSelector(get('code'));

  const callAccepted = useSelector(get('callAccepted'));

  useEffect(() => {
    console.log('code: ', code);
    console.log('tunnel:', tunnel);

    if (tunnel) {
      tunnel.send(code);
    } else {
      console.log("code");
    }
  }, [code]);

  function test1(ev, value) {
    tunnel.send(value);
    dispatch(setCode({ code: value }));
  }

  function test2(event) {
    tunnel.send(event.target.value);
    dispatch(setCode({ code: event.target.value }));
  }

  return (
    <MainContentWrapper>
      <textarea
        style={{ height: '50%' }}
        type="text"
        value={code}
        onChange={test2}
        disabled={!callAccepted}
      />
      {/* <ControlledEditor
        height="50%"
        value={code}
        onChange={test1}
        language="javascript"
      /> */}
    </MainContentWrapper>
  );
}
