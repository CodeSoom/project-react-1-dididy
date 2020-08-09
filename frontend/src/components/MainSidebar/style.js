import styled from '@emotion/styled';

export const MainSidebarWrapper = styled.div({
  width: '320px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  backgroundColor: 'light-gray',
  color: 'black',
});

export const WebcamContainerWrapper = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  video: {
    alignSelf: 'stretch',
    width: '100%',
    height: 'auto',
  },
});

export const ButtonWrapper = styled.button(({ toggle }) => ({
  display: toggle ? 'none' : 'inline',
}));
