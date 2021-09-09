import React, { PureComponent } from 'react';
import { GAS_LIMIT } from '../../../../constants';
import PromtConfigRatioSwap from '../PromtConfigRatioSwap';

class ConfigRatioSwap extends PureComponent {
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
    const { onConfigureRatioSwapStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount) {
      onConfigureRatioSwapStory && onConfigureRatioSwapStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet, percentageFee } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtConfigRatioSwap
        defaultValue={this.props.ufrRateToUPR}
        percentageFee={percentageFee}
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default ConfigRatioSwap;
