import React, { Component, Fragment } from 'react';
import trans from '../../../../translations';
import {
  TotalSuppySection,
  SubtitleWrapper,
  BallanceOne,
  Subtitle,
  UpfiringIcon,
  AvailableBalance,
  ActionBlock,
  UPRTotalSupplyWrapper
} from './style';
import { WalletBtn } from '../../../../components';
import BurnMintProgressPopup from '../BurnMintProgressPopup';
import { ufrFormat } from '../../../../utils/math';
import BurnModal from '../BurnModal';
import MintModal from '../MintModal';

class UPRTotalSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      burn: false,
      mint: false
    };
  }

  handlerShowPromptMint = () => {
    this.setState({
      mint: true
    });
  };

  handlerShowPromptBurn = () => {
    this.setState({
      burn: true
    });
  };

  handlerBurnClose = () => {
    this.setState({
      burn: false
    });
  };

  handlerMintClose = () => {
    this.setState({
      mint: false
    });
  };

  render() {
    const { burn, mint } = this.state;
    const { tokenTotalSupply, burnProgress, mintProgress } = this.props;
    return (
      <Fragment>
        <UPRTotalSupplyWrapper>
          <TotalSuppySection>
            <SubtitleWrapper>
              <Subtitle>{trans('manageupr.totalSupply.title')}</Subtitle>
            </SubtitleWrapper>
            <BallanceOne>
              <UpfiringIcon className="icon-ico-ufr" />
              <AvailableBalance>
                {tokenTotalSupply ? ufrFormat(tokenTotalSupply) : 0}{' '}
                {trans('popups.upload.UPR')}
              </AvailableBalance>
            </BallanceOne>
            <ActionBlock>
              <WalletBtn
                onClick={this.handlerShowPromptBurn}
                title="Burn"
                iconClass="hot"
              />
              <WalletBtn
                onClick={this.handlerShowPromptMint}
                title="Mint"
                iconClass="replenish"
              />
            </ActionBlock>
          </TotalSuppySection>
          {burn && (
            <BurnModal {...this.props} onClose={this.handlerBurnClose} />
          )}
          {mint && (
            <MintModal {...this.props} onClose={this.handlerMintClose} />
          )}
          {(burnProgress || mintProgress) && (
            <BurnMintProgressPopup {...this.props} />
          )}
        </UPRTotalSupplyWrapper>
      </Fragment>
    );
  }
}

export default UPRTotalSupply;
