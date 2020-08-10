import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

// import { ControlledEditor } from '@monaco-editor/react';

import { setCode } from '../../slice';

import { MainContentWrapper } from './style';

import { get } from '../../utils';

export default function MainContent({ tunnel }) {
  const dispatch = useDispatch();

  const code = useSelector(get('code'));

  const callAccepted = useSelector(get('callAccepted'));

  // useEffect(() => {
  //   if (tunnel) {
  //     tunnel.send(code);
  //   } else {
  //     console.log("code");
  //   }
  //  }, [code]);

  // function test1(ev, value) {
  //   console.log(ev);
  //   dispatch(setCode({ code: value }));
  // }

  function test2(event) {
    tunnel.send(event.target.value);
    dispatch(setCode({ code: event.target.value }));
  }

  return (
    <MainContentWrapper>
      {/* <ControlledEditor
        height="90vh"
        value={code}
        onChange={test1}
        language="javascript"
      /> */}
      <textarea
        style={{ height: '100%' }}
        type="text"
        value={code}
        onChange={test2}
        disabled={!callAccepted}
      />
    </MainContentWrapper>
  );
}
