import React, { PureComponent } from 'react';
import PopUp from '../../../../components/PopUp';
import { FullColumn, PopUpTitle } from '../WalletSection/style';
import LoadingCube from '../../../../components/LoadingCube';

class ConfigureFeeProgressPopup extends PureComponent {
  render() {
    return (
      <PopUp key="progress-popup">
        <FullColumn>
          <div className="sk-cube-grid">
            <LoadingCube />
          </div>
        </FullColumn>
        <PopUpTitle>Configure fee processing...</PopUpTitle>
      </PopUp>
    );
  }
}

ConfigureFeeProgressPopup.propTypes = {};

export default ConfigureFeeProgressPopup;
