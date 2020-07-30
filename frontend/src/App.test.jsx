import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('with path /', () => {
    it('renders the Landing page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Header');
    });
  });
});
