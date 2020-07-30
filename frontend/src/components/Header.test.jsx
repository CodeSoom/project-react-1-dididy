import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import Header from './Header';

test('Header', () => {
  const { container } = render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));

  expect(container).toHaveTextContent('Header');
});
