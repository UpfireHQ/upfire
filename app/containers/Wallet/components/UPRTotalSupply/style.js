import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const UPRTotalSupplyWrapper = styled.div`
  grid-area: topA;
  background-color: ${colors.mainGrey};
  border-radius: 0.7em;
`;

export const TotalSuppySection = styled.div`
  min-height: 205px;
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  padding: 0 1.5em 0 1.5em;
`;

export const Subtitle = styled.h4`
  font-size: ${fonts.mediumSize};
  color: ${colors.titleWhite};
  font-weight: 300;
`;

export const AvailableBalance = styled.h4`
  font-size: ${fonts.middleSize};
  font-weight: normal;
  color: ${colors.fontPrimary};
  margin: 0;
`;

export const ActionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${colors.bottomBorder};
  padding-top: 2em;
  &.withBlur {
    filter: blur(18px);
  }
`;

export const UpfiringIcon = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
  margin-right: 0.5em;
`;

export const SubtitleWrapper = styled.div`
  text-align: center;
  height: 4.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  > h4 {
    margin: 0;
  }
`;

export const BallanceOne = styled.div`
  border-top: 1px solid ${colors.bottomBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.5em;
`;
