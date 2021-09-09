import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const Subtitle = styled.h4`
  margin-left: 1em;
  font-size: ${fonts.middleSize};
  color: ${colors.titleblue};
  font-weight: 500;
`;

export const SubtitleIcon = styled.span`
  font-size: ${fonts.largeSize};
  font-weight: 500;
`;

export const Index = styled.div`
  display: grid;
  flex: 1;
  padding: 0.75em 1.5em 1em 1.5em;
  grid-template-columns: 1fr 0.9fr 1fr;
  ${({ isAdmin }) =>
    isAdmin
      ? `
    grid-template-areas:
      'topA circleA circleB'
      'circleC line line'
      'circleC line line';
  `
      : `
    grid-template-areas:
      'line line line' 'circleA circleB circleC';
  `}
  grid-gap: 24px;
`;

export const CircleGraphs = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0.34;
`;

export const OneGraph = styled.div`
  display: flex;
  flex-flow: column wrap;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  padding: 1em 2em;
  > h4 {
    margin: 0.5em 0;
  }
`;

export const SubtitleWrapper = styled.div`
  text-align: center;
  height: 5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StatisticGraph = styled.div`
  grid-area: line;
  display: flex;
  flex-flow: column wrap;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  padding: 1em 2em;
  > h4 {
    margin: 0;
  }
  > div > div > div {
    > svg {
      padding: 0.5em !important;
    }
  }
`;

export const GraphInfo = styled.div`
  display: flex;
  flex-flow: row;
`;

export const InfoContainer = styled.div`
  text-align: center;
  > div {
    font-style: normal;
    font-size: 1em;

    color: ${colors.fontPrimary};
  }
`;

export const Info = styled.div`
  height: 100px;
  width: 100px;
  border: 7px solid ${colors.mainBlack};
  border-top: 7px solid ${colors.lightRed};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  color: ${colors.fontPrimary};
  margin: 20px auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
