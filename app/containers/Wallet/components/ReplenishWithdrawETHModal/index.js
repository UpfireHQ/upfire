import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PromptETHReplenish } from '../PromptETHReplenish';
import { GAS_LIMIT, UPR_FLOAT_NUMBERS } from '../../../../constants';
import trans from '../../../../translations';
import { ufrFormat } from '../../../../utils/math';
import EthClient from '../../../../blockchain/client';

class ReplenishWithdrawETHModal extends PureComponent {
  get isWithdraw() {
    return Boolean(this.props && this.props.withdraw);
  }

  get title() {
    return trans(this.isWithdraw ? 'wallet.Withdraw' : 'wallet.Replenish');
  }

  get subtitle() {
    const { availableBalanceETH } = this.props;
    return this.isWithdraw
      ? trans('wallet.withdrawETHSubtitle', {
          max: ufrFormat(availableBalanceETH)
        })
      : trans('wallet.replenishETHSubtitle');
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
    const { onRefillETH, refillETHStory } = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onRefillETH && onRefillETH({ story: refillETHStory, ...valid });
    }
  };

  handlerWithdrawClick = (type, value = {}) => {
    const { onWithdrawETH, withdrawETHStory } = this.props;
    const valid = this.validateWithdrawReplenish(type, value);

    if (valid && valid.wallet && valid.amount) {
      onWithdrawETH && onWithdrawETH({ story: withdrawETHStory, ...valid });
    }
  };

  render() {
    const { gasPrice, wallet } = this.props;
    const gasLimit = (this.isWithdraw ? 1 : 2) * GAS_LIMIT;

    const handlerResult = this.isWithdraw
      ? this.handlerWithdrawClick
      : this.handlerReplenishClick;

    return (
      <PromptETHReplenish
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

ReplenishWithdrawETHModal.propTypes = {
  replenish: PropTypes.bool,
  withdraw: PropTypes.bool,
  availableBalance: PropTypes.string,
  wallet: PropTypes.object,
  onRefillETH: PropTypes.func,
  refillETHStory: PropTypes.object,
  onWithdraw: PropTypes.func,
  withdrawStory: PropTypes.object,
  withdrawETHStory: PropTypes.object,
  onClose: PropTypes.func
};

export default ReplenishWithdrawETHModal;
