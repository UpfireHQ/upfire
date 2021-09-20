import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import cogIcon from '../../../../assets/icons/cog.svg';

export const SettingButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: 0;
  background-image: url(${cogIcon});
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 60%;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin-left: 2px;
  &:hover {
    background-color: #111215;
  }
`;

export const BalanceDivWrapper = styled.div`
  padding: 8px 0;
  border-top: 1px solid ${colors.bottomBorder};
  border-bottom: 1px solid ${colors.bottomBorder};
`;

export const StakingUPRSectionWrapper = styled.div`
  grid-area: topB;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  grid-area: circleA;
`;

export const StakingUPRSection = styled.div`
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
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  > h4 {
    margin: 0;
  }
`;

export const BallanceOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 5em;
`;
