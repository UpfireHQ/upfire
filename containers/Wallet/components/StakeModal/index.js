import React, { PureComponent } from 'react';
import PromtStake from '../PromtStake';
import { GAS_LIMIT } from '../../../../constants';
import EthClient from '../../../../blockchain/client';

class StakeModal extends PureComponent {
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
    const { onStakeStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount) {
      onStakeStory && onStakeStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtStake
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default StakeModal;
