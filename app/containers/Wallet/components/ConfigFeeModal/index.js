import React, { PureComponent } from 'react';
import PromtConfigFee from '../PromtConfigFee';
import { GAS_LIMIT } from '../../../../constants';

class ConfigFeeModal extends PureComponent {
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
        const amount = value.value;

        onClose && onClose();
        return { wallet: walletDecode, amount, gasPrice, gasLimit };
      }
    } else {
      onClose && onClose();
    }

    return null;
  };

  handlerResult = (type, value = {}) => {
    const { onConfigureFeeStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount) {
      onConfigureFeeStory && onConfigureFeeStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet, percentageFee } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtConfigFee
        percentageFee={percentageFee}
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default ConfigFeeModal;
