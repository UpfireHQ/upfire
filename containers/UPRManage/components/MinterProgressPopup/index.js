import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../../translations';
import PopUp from '../../../../components/PopUp';
import {
  FullColumn,
  PopUpTitle
} from '../../../Wallet/components/WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class MinterProgressPopup extends PureComponent {
  render() {
    const { addMinterProgress } = this.props;
    const text = addMinterProgress
      ? 'Add minter processing...'
      : 'Remove minter processing...';

    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube />
          </div>
        </FullColumn>
        <PopUpTitle>{text}</PopUpTitle>
      </PopUp>
    );
  }
}

MinterProgressPopup.propTypes = {};

export default MinterProgressPopup;
