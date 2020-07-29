import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App', () => {
  const { element } = render(<App />);
  expect(element).toHaveTextContent('init');
});
