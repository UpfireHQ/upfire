import React, { Component } from 'react';
import trans from '../../../../translations';
import {
  StakingUPRSection,
  SubtitleWrapper,
  BallanceOne,
  Subtitle,
  UpfiringIcon,
  AvailableBalance,
  ActionBlock,
  SettingButton,
  BalanceDivWrapper,
  StakingUPRSectionWrapper
} from './style';
import { WalletBtn } from '../../../../components';
import StakeWithdrawProgressPopup from '../StakeWithdrawProgressPopup';
import ConfigureFeeProgressPopup from '../ConfigureFeeProgressPopup';
import { ufrFormat } from '../../../../utils/math';
import WithdrawStakeModal from '../WithdrawStakeModal';
import StakeModal from '../StakeModal';
import ConfigFeeModal from '../ConfigFeeModal';

class UPRTotalSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdraw: false,
      stake: false,
      configFee: false
    };
  }

  handlerShowPromptStake = () => {
    this.setState({
      stake: true
    });
  };

  handlerShowPromptWithdraw = () => {
    this.setState({
      withdraw: true
    });
  };

  handlerWithdrawClose = () => {
    this.setState({
      withdraw: false
    });
  };

  handlerStakeClose = () => {
    this.setState({
      stake: false
    });
  };

  handlerShowConfigureFee = () => {
    this.setState({
      configFee: true
    });
  };

  handlerConfigureFeeClose = () => {
    this.setState({
      configFee: false
    });
  };

  render() {
    const { withdraw, stake, configFee } = this.state;
    const {
      stakeBalanceUPR,
      withdrawStakeProgress,
      stakeProgress,
      percentageFee,
      configureFeeProgress,
      isAdmin
    } = this.props;

    return (
      <StakingUPRSectionWrapper>
        <StakingUPRSection
          style={{
            minHeight: '245px'
          }}
        >
          <SubtitleWrapper
            style={{
              height: '4.5em'
            }}
          >
            <Subtitle>UPR Staking</Subtitle>
          </SubtitleWrapper>
          <BalanceDivWrapper
            style={{
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <BallanceOne
              style={{
                height: '3em',
                paddingTop: 8
              }}
            >
              <UpfiringIcon className="icon-ico-ufr" />
              <AvailableBalance>
                {stakeBalanceUPR ? ufrFormat(stakeBalanceUPR) : 0}{' '}
                {trans('popups.upload.UPR')}
              </AvailableBalance>
            </BallanceOne>
            <BallanceOne
              style={{
                height: '2.8em',
                fontSize: '1.2em',
                borderTop: 0,
                color: '#acaccc',
                transform: 'translateY(2px)',
                justifyContent: 'space-between'
              }}
            >
              Fee {percentageFee}%{' '}
              {isAdmin ? (
                <SettingButton onClick={this.handlerShowConfigureFee} />
              ) : null}
            </BallanceOne>
          </BalanceDivWrapper>
          <ActionBlock>
            <WalletBtn
              onClick={this.handlerShowPromptWithdraw}
              title="Withdraw"
              iconClass="withdraw"
            />
            <WalletBtn
              onClick={this.handlerShowPromptStake}
              title="Stake"
              iconClass="replenish"
            />
          </ActionBlock>
        </StakingUPRSection>
        {withdraw && (
          <WithdrawStakeModal
            {...this.props}
            onClose={this.handlerWithdrawClose}
          />
        )}
        {stake && (
          <StakeModal {...this.props} onClose={this.handlerStakeClose} />
        )}
        {configFee && (
          <ConfigFeeModal
            {...this.props}
            onClose={this.handlerConfigureFeeClose}
          />
        )}
        {(withdrawStakeProgress || stakeProgress) && (
          <StakeWithdrawProgressPopup {...this.props} />
        )}
        {configureFeeProgress && <ConfigureFeeProgressPopup {...this.props} />}
      </StakingUPRSectionWrapper>
    );
  }
}

export default UPRTotalSupply;
