import styled from '@emotion/styled';

export const MainWrapper = styled.div({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  flex: 1,
  display: 'flex',
  alignItems: 'stretch',
  '@media(max-width: 788px)': {
    flexDirection: 'column',
  },
});

// TODO: delete this style
export const dummy = styled.div({

});
