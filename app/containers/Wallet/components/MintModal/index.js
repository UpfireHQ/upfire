import React, { PureComponent } from 'react';
import PromtMint from '../PromtMint';
import { GAS_LIMIT } from '../../../../constants';
import EthClient from '../../../../blockchain/client';

class MintModal extends PureComponent {
  validate = (type, value = {}) => {
    const { onClose } = this.props;

    if (type) {
      if (
        value.value &&
        value.walletDecode &&
        value.gasPrice &&
        value.gasLimit &&
        value.address
      ) {
        const { gasPrice, gasLimit, walletDecode, address } = value;
        const amount = EthClient.instance.toWei(value.value);

        onClose && onClose();
        return { wallet: walletDecode, amount, gasPrice, gasLimit, address };
      }
    } else {
      onClose && onClose();
    }

    return null;
  };

  handlerResult = (type, value = {}) => {
    const { onMintStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.amount && valid.address) {
      onMintStory && onMintStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = 2 * GAS_LIMIT;
    return (
      <PromtMint
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default MintModal;
