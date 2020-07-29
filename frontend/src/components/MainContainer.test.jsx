import React from 'react';
import { render } from '@testing-library/react';
import MainContainer from './MainContainer';

test('MainContainer', () => {
  const { element } = render(<MainContainer />);
  expect(element).toHaveTextContent('MainContainer');
});
