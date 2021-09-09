import React, { PureComponent } from 'react';
import PromtSwapUFRToUPR from '../PromtSwapUFRToUPR';
import { GAS_LIMIT } from '../../../../constants';
import EthClient from '../../../../blockchain/client';

class UFRSwapToUPRModal extends PureComponent {
  validate = (type, value = {}) => {
    const { onClose } = this.props;

    if (type) {
      if (
        value.value &&
        value.walletDecode &&
        value.gasPrice &&
        value.gasLimit
      ) {
        const { gasPrice, gasLimit, walletDecode } = value;
        const amount = EthClient.instance.toWei(value.value);

        onClose && onClose();
        return { wallet: walletDecode, amount, gasPrice, gasLimit };
      }
    } else {
      onClose && onClose();
    }

    return null;
  };

  handlerResult = (type, value = {}) => {
    const { onUFRSwapToUPR } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount) {
      onUFRSwapToUPR && onUFRSwapToUPR({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet, ufrRateToUPR } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtSwapUFRToUPR
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
        ufrRateToUPR={ufrRateToUPR}
      />
    );
  }
}

export default UFRSwapToUPRModal;
