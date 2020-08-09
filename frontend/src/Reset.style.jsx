import React from 'react';

import { Global } from '@emotion/core';

const styles = {
  body: {
    margin: '0',
  },
};

export default function Reset() {
  return <Global styles={styles} />;
}
