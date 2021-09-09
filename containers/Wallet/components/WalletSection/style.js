import styled from 'styled-components';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import { EmptyListStub, UButton } from '../../../../components';
import close from '../../../../assets/icons/ico-cross.svg';
import closeHover from '../../../../assets/icons/ico-cross-hover.svg';
import Ok from '../../../../assets/images/checking.svg';
import { LinkButton } from '../../../../style/components';

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
  grid-template-columns: 1fr 0.9fr 1fr;
  grid-column-gap: 24px;

  padding: 2em 1.5em 1em 1.5em;
`;

export const WalletInputSection = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  padding: 1em 2em;
  min-height: 20em;
  position: relative;
`;

export const FullWalletAddress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.7em;
  background-color: ${colors.fullWalletBlockBg};
  left: 0;
  padding: 2em 2.5em;
`;

export const Close = styled.span`
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 1.5em;
  top: 1.5em;
  background-image: url(${close});
  width: 11px;
  height: 11px;
  &:hover {
    background-image: url(${closeHover});
  }
`;

export const FullWalletAddressDesc = styled.div`
  text-align: center;
  font-size: ${fonts.minStandartSize};
  padding: 1.8em 0;
  color: ${colors.inputLabel};
`;

export const Label = styled.label`
  left: 15px;
  top: -45px !important;
`;

export const FullWalletAddressValue = styled.div`
  text-align: center;
  font-size: ${fonts.mediumSize};
  color: ${colors.titleblue};
  word-break: break-all;
`;

export const WalletBallanceSection = styled.div`
  min-height: 20em;
  display: flex;
  flex-flow: column wrap;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  text-align: center;
  padding: 1em 2em;
`;

export const WithdrawSection = styled.div`
  display: flex;
  flex-flow: column wrap;
  background-color: ${colors.sideWhite};
  border-radius: 0.7em;
  text-align: center;
  padding: 1em 1.5em;
  min-height: 20em;
  > h4 {
    text-align: center !important;
  }
`;

export const WalletButton = styled(UButton)`
  width: 100px;
  margin: 0 auto;
`;

export const BallanceDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: ${colors.fontSecondary};
  background-color: ${colors.bgBlue};
  border: 1px solid ${colors.borderBlue};
  border-radius: 8px;
  padding: 0.2em 1em;
  margin-bottom: 1em;
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.bgBlue};
  padding: 0.8em;
  border-radius: 6px;
  justify-content: space-between;
  position: relative;
`;

export const Ballance = styled.h4`
  font-size: ${fonts.mediumSize};
  color: ${colors.fontPrimary};
  margin: 0;
  text-align: left;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    color: ${colors.titleblue} ~.coinmarketcap-currency-widget {
      display: block;
    }
  }
`;

export const CurrencyWidget = styled.div`
  position: absolute;
  z-index: 50;
  top: 3em;
  left: -40%;
  display: none;
`;

export const BallanceEllipsis = styled.h4`
  font-size: ${fonts.mediumSize};
  color: ${colors.titleblue};
  margin: 0;
  text-align: left;
  display: inline-block;
  font-weight: normal;
  width: 74%;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  text-overflow: ellipsis;
  &.withTooltip {
    &:hover {
      color: ${colors.titleblue} ~.tooltip {
        display: block;
      }
    }
  }
`;

export const WithdrawBallance = styled.span`
  font-size:${fonts.largeSize};
  font-weight: 500;
  color: ${colors.textBlue4};
  margin: 0 0.5em 0 0;
`;

export const WithdrawBallanceUnit = styled.span`
  padding: 4px 12px;
  font-size:${fonts.moreStadartSize};
  color: ${colors.textBlue5};
  border-radius: 3px;
  background-color: ${colors.bgBlue2};
`;

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 2.5em;
  left: 0;
  z-index: 2;
  font-style: normal;
  color: ${colors.defaultBtnHover};
  padding: 1em;
  font-size: ${fonts.moreStadartSize};
  background-color: ${colors.tooltipsBackground};
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  white-space: nowrap;
  &::after {
    content: ' ';
    position: absolute;
    top: -10px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${colors.tooltipsBackground}
      transparent;
  }
`;

export const WalletPass = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2em;
`;

export const FileButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 94%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid ${colors.fontSecondary};
  background-color: ${colors.brandSecondary};
  background-image: url(${Ok});
  &:hover {
    background-color: #0cb2c9;
  }
`;

export const UPRLogo = styled.img`
  max-width: 100%;
  width: 2em;
  margin-right: 1em;
  display: block;
`;

export const WalletDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: ${colors.fontSecondary};
  background-color: ${colors.bgBlue};
  border: 1px solid ${colors.borderBlue};
  border-radius: 8px;
  padding: 0.2em 1em;
  margin-bottom: 1em;
  &.withBlur {
    filter: blur(18px);
  }
`;

export const WalletIn = styled.h4`
  margin: 0;
  display: inline-block;
  word-break: break-all;
  font-size: ${fonts.mediumSize};
  color: ${colors.titleblue};
  font-weight: normal;
`;

export const BallanceOne = styled.div`
  border-top: 1px solid ${colors.bottomBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AvailableBalance = styled.h4`
  font-size: ${fonts.middleSize};
  font-weight: normal;
  color: ${colors.fontPrimary};
  margin: 0;
`;

export const SubtitleFlexRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  height: 5em;
  border-bottom: 1px solid ${colors.bottomBorder};
  > h4 {
    margin-left: 1em;
  }
  > span {
    color: ${colors.fontSecondary};
    font-weight: 300;
    > a {
      font-weight: 600;
      color: ${colors.fontPrimary};
      text-decoration: underline;
    }
  }
  &.withBlur {
    filter: blur(18px);
  }
`;

export const WalletError = styled.p`
  color: ${colors.brandPrimary};
  position: absolute;
  margin: 0;
`;

export const ActionBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-top: 1px solid ${colors.bottomBorder};
  &.withBlur {
    filter: blur(18px);
  }
  > *:first-child {
    margin-right: 0.8em;
  }
`;

export const ActionOneBlock = styled(ActionBlock)`
  justify-content: center;
`;

export const UpfiringIcon = styled.span`
  color: ${colors.ufrLogo};
  font-size: ${fonts.biggestSize};
  margin-right: 0.5em;
`;

export const UFRIcon = styled.span`
  color: ${colors.ufrOldLogo};
  font-size: ${fonts.biggestSize};
  margin-right: 0.5em;
`;

export const SubtitleWrapper = styled.div`
  text-align: center;
  height: 5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Stub = styled(EmptyListStub)`
  background-color: ${colors.wrapperBackground};
  height: calc(100vh - 100px);
`;

export const StubTitle = styled.div`
  font-size: ${fonts.largeSize};
  text-align: center;
  padding-bottom: 1.5em;
  font-weight: 500;
  font-size: 30px;
  color: ${colors.titleblue};
  margin-bottom: 0;
`;


export const StubSubTitle = styled.div`
  font-size: ${fonts.moreStadartSize};
  color: ${colors.titleblue};
  text-align: center;
  line-height: 1.47;
  > p {
    margin: 0.2em;
    width: 685px;
    margin: 0 auto;
    font-size: 20px;
    line-height: 160%;
  }
`;

export const StubLearnMore = styled.div`
padding: 2em 0 3em 0;
text-align: center;
> a {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.learnMore};
  &:hover {
    color: ${colors.titleblue};
  }
}
`;

export const StubBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 245px;
    height: 56px;
    background: ${colors.buttonBackgroundClolor};
    border-radius: 6px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.titleWhite};
    margin: 0 15px;
    &:hover{
      background: #ff2b64;
    }
    span{
      white-space: nowrap;
    }
    .material-icons {
      display: none;
    }
  }
  button:nth-child(2n){
    background: ${colors.welletsecondBackground};
    &:hover{
      background: ${colors.wellethoversecondBackground};
    }
  }
`;

export const ActionsTwo = styled.div`
  display: flex;
  width: 24em;
  justify-content: space-between;
`;

export const PromptWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
`;

export const AddWalletMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddWalletMenuItem = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.walletActiveBtncolor};
  border: 1px solid ${colors.walletBorderColor};
  box-sizing: border-box;
  cursor: pointer;
  height: 3.4em;
  font-size: ${fonts.mediumSize}
  position: relative;
  margin-bottom: 2.5em;
  transition: all 0.3s ease;
  &:hover {
    color: ${colors.walletActiveBtncolor};
    background: ${colors.tableTitleBackground};
    border: 1px solid ${colors.walletActiveBtncolor};
  }
  &.active {
    background: ${colors.walletActiveBtncolor};
    color: ${colors.titleWhite};
    border: 1px solid ${colors.walletActiveBtncolor};
  }
  &.withBorder {
    &:after {
      content : "";
      position: absolute;
      right    : -1px;
      z-index: 100;
      top  : 1.9em;
      width  : 1px;
      height   : 1.2em;
      background: ${colors.tabBorderRight};
    }
  }
`;

export const PromptWarningMessage = styled.div`
  text-align: center;
  color: ${colors.walletTextColor};
  font-size: 16px;
  line-height: 22px;
  padding-top: .5em;
  margin-bottom: 1.5em;
  > span {
    margin-right: 5px;
  }
`;

export const PromptDangerMessage = styled.div`
  font-size: ${fonts.mediumSize}
  text-align: center;
  color: ${colors.textBlue};
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 1.5em;
  font-weight: 500;
`;

export const PromptSecondaryActions = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: auto;
`;

export const SecondaryAction = styled(LinkButton)`
  padding: 0.375em 3em;
  border: 1px solid ${colors.addWalletButton};
  font-size: 14px;
  color: ${colors.addWalletButton};
  box-sizing: border-box;
  border-radius: 8px;
  height: 40px;
  &:hover {
    border: 1px solid ${colors.buttonBackgroundClolor};
    color: ${colors.buttonBackgroundClolor};
  }

`;

export const FullColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 100%;
  position: relative;
  margin-bottom: 1.2em;
`;

export const PopUpTitle = styled.h2`
  font-size: ${fonts.largeSize};
  color: ${colors.titleblue};
  font-weight: 500;
  margin: 1.5em 0 1em 0;
  text-align: center;
`;

export const DecodingLoader = styled.div`
  color: ${colors.fontPrimary};
  display: flex;
  align-items: center;
`;

export const Loader = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 3px solid ${colors.lightRed};
  border-top: 3px solid ${colors.sideBlack};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  margin-right: 15px;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
