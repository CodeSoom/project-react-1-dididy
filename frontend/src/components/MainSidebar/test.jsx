import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MainSidebar from './index';

import STREAM from '../../../fixtures/stream';
import CALLER_SIGNAL from '../../../fixtures/callerSignal';

describe('MainSidebar', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      myId: 'test1',
      users: {
        test2: 'test2',
      },
      stream: STREAM,
      receivingCall: true,
      caller: 'test2',
      callerSignal: CALLER_SIGNAL,
      callAccepted: true,
    }));
  });

  function renderMainSidebar() {
    return render((
      <MemoryRouter>
        <MainSidebar />
      </MemoryRouter>
    ));
  }

  it('renders properly', () => {
    const { container } = renderMainSidebar();

    expect(container).toHaveTextContent('MainSidebar');
  });

  it('renders myId', () => {
    const { queryByText } = renderMainSidebar();

    expect(dispatch).toBeCalled();

    expect(queryByText('test1')).not.toBeNull();
  });

  // caller가 없는 상황을 나눌 것인가 고민
  context('before click one of users button', () => {
    it('renders users buttons', () => {
      const { queryByText } = renderMainSidebar();

      expect(dispatch).toBeCalled();

      expect(queryByText('test2')).not.toBeNull();
    });

    it('renders my webacam properly', () => {
    });
  });

  // 내가 거는 상황, 내가 받는 상황이 또 나눠짐 이건 어떻게 처리해야 하는가.
  context('after click one of users button', () => {
    context('before click accept button', () => {
    });

    context('after click accept button', () => {
      it('renders caller webcam properly', () => {
      });

      it('renders "Connected with <caller>"', () => {
      });

      it('disable buttons', () => {
      });
    });
  });
});
