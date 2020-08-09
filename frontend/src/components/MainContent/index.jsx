import React from 'react';

import Editor from '@monaco-editor/react';

import { MainContentWrapper } from './style';

export default function MainContent() {
  return (
    <MainContentWrapper>
      <Editor
        height="100%"
        language="javascript"
        value={'// Write code below\n'}
      />
    </MainContentWrapper>
  );
}
