import styled from '@emotion/styled';

export const MainSidebarWrapper = styled.div({
  '@media(min-width: 788px)': {
    width: '320px',
  },

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
  justifyContent: 'flex-end',
  '@media(max-width: 788px)': {
    flexDirection: 'row',
  },
  video: {
    alignSelf: 'stretch',
    width: '100%',
    height: 'auto',
    '@media(max-width: 788px)': {
      width: '50%',
    },
  },
});

export const ButtonWrapper = styled.button(({ toggle }) => ({
  display: toggle ? 'none' : 'inline',
}));

export const IncomingCallPopUp = styled.div({
  background: 'none',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const PopUp = styled.div({
  border: '1px solid',
  background: 'white',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});
