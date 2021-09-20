import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class StakeWithdrawProgressPopup extends PureComponent {
  get title() {
    const { stakeProgress } = this.props;

    return stakeProgress
      ? 'Stake UPR processing...'
      : 'Withdraw stake UPR processing...';
  }

  render() {
    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube />
          </div>
        </FullColumn>
        <PopUpTitle>{this.title}</PopUpTitle>
      </PopUp>
    );
  }
}

StakeWithdrawProgressPopup.propTypes = {
  burnProgress: PropTypes.bool,
  stakeProgress: PropTypes.bool
};

export default StakeWithdrawProgressPopup;
