import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';

const PopUpOver = styled.div`
    position: fixed;
    background-color: ${colors.wrapperBackgroundOverlay};
    z-index: 99999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
`;

const PopUpOverWithBg = styled(PopUpOver)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background: ${colors.wrapperBackgroundOverlay};
`;

const PopUp = styled.div`
  width: 700px;
  background: ${colors.tableBackground};
  box-shadow: 32.8788px 36.0606px 15.9091px ${colors.boxShadowPopup};
  border-radius: 17px;
  padding: 30px 55px 40px;
  position: relative;
  > div {
    .MuiButtonBase-root-28 {
      margin-top: 0 !important;
    }
  }

  h2 {
    font-weight: 500;
    margin-top: 1em;
  }

  h3 {
    color: ${colors.walletPnbText};
  }
  .editTitle {
    margin-bottom: 30px;
  }
  .addwallet {
    .sc-jqCOkK {
      margin-bottom: 15px;
    }
  }
  .upload-text {
    margin-bottom: 60px;
    span{
      margin-right: 25px;
    }
  }


`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return (
      <PopUpOver>
        <PopUp {...props} />
      </PopUpOver>
    );
  }
}

export class PopUpWithBg extends React.PureComponent {
  render() {
    const { bg, ...props } = this.props;
    return (
      <PopUpOverWithBg>
        <PopUp {...props} />
      </PopUpOverWithBg>
    );
  }
}
