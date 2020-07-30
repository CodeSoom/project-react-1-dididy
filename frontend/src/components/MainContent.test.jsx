import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import MainContent from './MainContent';

test('MainContent', () => {
  const { container } = render((
    <MemoryRouter>
      <MainContent />
    </MemoryRouter>
  ));

  expect(container).toHaveTextContent('MainContent');
});
