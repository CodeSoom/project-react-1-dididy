import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import MainSidebar from './MainSidebar';

test('MainSidebar', () => {
  const { container } = render((
    <MemoryRouter>
      <MainSidebar />
    </MemoryRouter>
  ));

  expect(container).toHaveTextContent('MainSidebar');
});
