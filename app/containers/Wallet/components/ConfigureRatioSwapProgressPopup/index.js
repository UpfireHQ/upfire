import React, { PureComponent } from 'react';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class ConfigureRatioSwapProgressPopup extends PureComponent {
  render() {
    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube />
          </div>
        </FullColumn>
        <PopUpTitle>Configure ratio swap processing...</PopUpTitle>
      </PopUp>
    );
  }
}

ConfigureRatioSwapProgressPopup.propTypes = {};

export default ConfigureRatioSwapProgressPopup;
