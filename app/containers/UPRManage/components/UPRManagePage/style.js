import styled from 'styled-components';
import UTable from '../../../../components/Table';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';

export const UPRManageWrapper = styled.div`
  height: 100%;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const UPRMinterTable = styled(UTable)`
  position: relative;
  flex: 1;
`;

export const AddressCell = styled.th`
  width: 80%;
`;

export const ActionCell = styled.th`
  width: 20%;
`;

export const AddressText = styled.span`
  margin-left: 16px;
`;

export const Index = styled.div`
  display: flex;
  flex-flow: row;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 2em 1.5em 1em 1.5em;
  > div {
    > h4 {
      margin: 0;
    }
  }
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

export const TotalSuppySection = styled.div`
  min-height: 205px;
  display: flex;
  flex-flow: column wrap;
  flex: 0.3;
  background-color: ${colors.mainGrey};
  border-radius: 0.7em;
  text-align: center;
  padding: 0 1.5em 0 1.5em;
`;

export const Subtitle = styled.h4`
  font-size: ${fonts.mediumSize};
  color: ${colors.titleWhite};
  font-weight: 300;
`;

export const BallanceOne = styled.div`
  border-top: 1px solid ${colors.bottomBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5em;
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
  padding-top: 1.5em;
  &.withBlur {
    filter: blur(18px);
  }
`;

export const UpfiringIcon = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
  margin-right: 0.5em;
`;

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
