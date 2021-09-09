import React, { PureComponent } from 'react';
import { GAS_LIMIT } from '../../../../constants';
import PromtMinter from '../PromtMinter';

class AddMinterModal extends PureComponent {
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
    const { onAddMinterStory } = this.props;
    const valid = this.validate(type, value);

    if (valid && valid.wallet && valid.address) {
      onAddMinterStory && onAddMinterStory({ ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = 2 * GAS_LIMIT;

    return (
      <PromtMinter
        onClick={this.handlerResult}
        wallet={wallet}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
      />
    );
  }
}

export default AddMinterModal;
