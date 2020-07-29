import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('Main', () => {
  const { element } = render(<Main />);
  expect(element).toHaveTextContent('MainContainer');
});
