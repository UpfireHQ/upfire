import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class BurnMintProgressPopup extends PureComponent {
  get title() {
    const { burnProgress } = this.props;

    return burnProgress ? 'Burn UPR processing...' : 'MINT UPR processing...';
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

BurnMintProgressPopup.propTypes = {
  burnProgress: PropTypes.bool,
  mintProgress: PropTypes.bool
};

export default BurnMintProgressPopup;
