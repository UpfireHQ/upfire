import React, { PureComponent } from 'react';
import PromtWithdrawStake from '../PromtWithdrawStake';
import { GAS_LIMIT } from '../../../../constants';
import EthClient from '../../../../blockchain/client';

class WithdrawStakeModal extends PureComponent {
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
    const { onWithdrawStakeStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount) {
      onWithdrawStakeStory && onWithdrawStakeStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtWithdrawStake
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default WithdrawStakeModal;
