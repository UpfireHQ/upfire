import React, { PureComponent } from 'react';
import PromtDeleteConfirm from '../PromtDeleteConfirm';
import { GAS_LIMIT } from '../../../../constants';

class DeleteConfirmModal extends PureComponent {
  validate = (type, value = {}) => {
    const { onClose } = this.props;

    if (type) {
      if (
        value.address &&
        value.walletDecode &&
        value.gasPrice &&
        value.gasLimit
      ) {
        const { gasPrice, gasLimit, walletDecode } = value;

        onClose && onClose();
        return {
          wallet: walletDecode,
          address: value.address,
          gasPrice,
          gasLimit
        };
      }
    } else {
      onClose && onClose();
    }

    return null;
  };

  handlerResult = (type, value = {}) => {
    const { onDeleteMinterStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.address) {
      onDeleteMinterStory && onDeleteMinterStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet, address } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtDeleteConfirm
        address={address}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
        onClick={this.handlerResult}
      />
    );
  }
}

export default DeleteConfirmModal;
