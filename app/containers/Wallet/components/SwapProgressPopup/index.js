import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class SwapProgressPopup extends PureComponent {
  render() {
    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube />
          </div>
        </FullColumn>
        <PopUpTitle>Swap processing...</PopUpTitle>
      </PopUp>
    );
  }
}

SwapProgressPopup.propTypes = {};

export default SwapProgressPopup;
