import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import MainSidebar from './MainSidebar';

describe('MainSidebar', () => {
  it('render properly', () => {
    const { container } = render((
      <MemoryRouter>
        <MainSidebar />
      </MemoryRouter>
    ));
    expect(container).toHaveTextContent('MainSidebar');
  });
});
