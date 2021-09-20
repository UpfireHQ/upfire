import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PromptUPRReplenish } from '../PromptUPRReplenish';
import { GAS_LIMIT, UPR_FLOAT_NUMBERS } from '../../../../constants';
import trans from '../../../../translations';
import { ufrFormat } from '../../../../utils/math';
import EthClient from '../../../../blockchain/client';

class ReplenishWithdrawUPRModal extends PureComponent {
  get isWithdraw() {
    return Boolean(this.props && this.props.withdraw);
  }

  get title() {
    return trans(this.isWithdraw ? 'wallet.Withdraw' : 'wallet.Replenish');
  }

  get subtitle() {
    const { availableBalanceUPR } = this.props;
    return this.isWithdraw
      ? trans('wallet.withdrawUPRSubtitle', {
          max: ufrFormat(availableBalanceUPR)
        })
      : trans('wallet.replenishUPRSubtitle');
  }

  validateWithdrawReplenish(type, value = {}) {
    const { wallet, onClose } = this.props;

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
  }

  handlerReplenishClick = (type, value = {}) => {
    const { onRefillUPR, refillUPRStory } = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onRefillUPR && onRefillUPR({ story: refillUPRStory, ...valid });
    }
  };

  handlerWithdrawClick = (type, value = {}) => {
    const { onWithdrawUPR, withdrawUPRStory } = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onWithdrawUPR && onWithdrawUPR({ story: withdrawUPRStory, ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = (this.isWithdraw ? 1 : 2) * GAS_LIMIT;

    const handlerResult = this.isWithdraw
      ? this.handlerWithdrawClick
      : this.handlerReplenishClick;

    return (
      <PromptUPRReplenish
        key="replenish-withdraw"
        pattern={`[0-9]+(\\.[0-9]{0,${UPR_FLOAT_NUMBERS}})?`}
        onClick={handlerResult}
        title={this.title}
        subtitle={this.subtitle}
        gasPrice={gasPrice}
        gasLimit={gasLimit}
        wallet={wallet}
      />
    );
  }
}

ReplenishWithdrawUPRModal.propTypes = {
  replenish: PropTypes.bool,
  withdraw: PropTypes.bool,
  availableBalance: PropTypes.string,
  wallet: PropTypes.object,
  onRefillUPR: PropTypes.func,
  refillUPRStory: PropTypes.object,
  onWithdrawUPR: PropTypes.func,
  withdrawUPRStory: PropTypes.object,
  onClose: PropTypes.func
};

export default ReplenishWithdrawUPRModal;
