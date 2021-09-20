import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  ALLOWANCE,
  APPROVE,
  BALANCE_OF_CONTRACT_TOKEN_ETH,
  BALANCE_OF_CONTRACT_TOKEN_UPR,
  BALANCE_OF_UPR_STAKING,
  BALANCE_OF_ETH,
  BALANCE_OF_TOKEN,
  TOTAL_SUPPLY_OF_TOKEN,
  CHANGE_BALANCE,
  GAS_PRICE,
  GAS_PRICE_DEFAULT,
  HISTORY,
  REDIRECT_AFTER_SET_WALLET,
  REFILL_ETH,
  REFILL_ETH_DONE,
  REFILL_ETH_INIT,
  REFILL_UPR,
  REFILL_UPR_INIT,
  REFILL_UPR_DONE,
  REMOVE_WALLET,
  SET_WALLET,
  TOTAL_RECEIVING_OF,
  TOTAL_SPENDING_OF,
  WITHDRAW_ETH,
  WITHDRAW_ETH_DONE,
  WITHDRAW_ETH_INIT,
  BURN,
  BURN_INIT,
  BURN_DONE,
  MINT,
  MINT_INIT,
  MINT_DONE,
  WITHDRAW_UPR,
  WITHDRAW_UPR_INIT,
  WITHDRAW_UPR_DONE,
  STAKE,
  STAKE_INIT,
  STAKE_DONE,
  WITHDRAW_STAKE_UPR,
  WITHDRAW_STAKE_UPR_INIT,
  WITHDRAW_STAKE_UPR_DONE,
  PERCENTAGE_OF_FEE,
  CONFIGURE_FEE,
  CONFIGURE_FEE_INIT,
  CONFIGURE_FEE_DONE,
  BALANCE_OF_UFR_TOKEN,
  UFR_SWAP_TO_UPR_RATE,
  UFR_SWAP_TO_UPR,
  UFR_SWAP_TO_UPR_INIT,
  UFR_SWAP_TO_UPR_DONE,
  APPROVE_UFR,
  ALLOWANCE_UFR,
  CONFIGURE_RATIO_SWAPPING_DONE,
  CONFIGURE_RATIO_SWAPPING,
  CONFIGURE_RATIO_SWAPPING_INIT
} from './constants';
import { walletStore } from '../../utils/localStorage';

const address = walletStore.get('address');

const initialState = fromJS({
  address,
  [address]: walletStore.all()
});

export default typeToReducer(
  {
    [SET_WALLET]: (state, action) => {
      const { address, publicKey, wallet } = action.payload;
      return state
        .set('address', String(address))
        .set(address, fromJS({ address, publicKey, wallet }))
        .delete('disableChangeBalanceLoading')
        .delete('disableHistoryLoading')
        .delete('refillProgress')
        .delete('withdrawProgress');
    },

    [REMOVE_WALLET]: state => {
      return state.set('address', null);
    },

    [BALANCE_OF_ETH]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        return state.setIn([address, 'ethBalance'], fromJS(balance));
      }
    },

    [BALANCE_OF_TOKEN]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        return state.setIn([address, 'tokenBalance'], fromJS(balance));
      }
    },

    [BALANCE_OF_UFR_TOKEN]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        return state.setIn([address, 'ufrTokenBalance'], fromJS(balance));
      }
    },

    [TOTAL_SUPPLY_OF_TOKEN]: {
      SUCCESS: (state, action) => {
        const { totalSupply } = action.payload;
        return state.set('tokenTotalSupply', fromJS(totalSupply));
      }
    },

    [UFR_SWAP_TO_UPR_RATE]: {
      SUCCESS: (state, action) => {
        const { rate } = action.payload;
        return state.set('ufrRateToUPR', fromJS(rate));
      }
    },

    [BALANCE_OF_CONTRACT_TOKEN_ETH]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        return state.setIn([address, 'availableBalanceETH'], fromJS(balance));
      }
    },

    [BALANCE_OF_CONTRACT_TOKEN_UPR]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        return state.setIn([address, 'availableBalanceUPR'], fromJS(balance));
      }
    },
    [BALANCE_OF_UPR_STAKING]: {
      SUCCESS: (state, action) => {
        const { address, balance } = action.payload;
        console.log('balance==>', balance);
        return state.setIn([address, 'stakeBalanceUPR'], fromJS(balance));
      }
    },
    [APPROVE]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn([address, 'refillStory', 'approve'], fromJS(tx));
      }
    },

    [ALLOWANCE]: {
      SUCCESS: (state, action) => {
        const { address, allowance } = action.payload;
        return state.setIn(
          [address, 'refillStory', 'allowance'],
          fromJS(allowance)
        );
      }
    },

    [APPROVE_UFR]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn(
          [address, 'ufrSwapToUPRStory', 'approve'],
          fromJS(tx)
        );
      }
    },

    [ALLOWANCE_UFR]: {
      SUCCESS: (state, action) => {
        const { address, allowance } = action.payload;
        return state.setIn(
          [address, 'ufrSwapToUPRStory', 'allowance'],
          fromJS(allowance)
        );
      }
    },

    [REFILL_ETH]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn([address, 'refillStory', 'refill'], fromJS(tx));
      }
    },
    [REFILL_ETH_INIT]: (state, action) => {
      const { address } = action.payload;
      return state
        .setIn([address, 'refillStory'], fromJS({}))
        .set('refillProgress', true);
    },

    [REFILL_ETH_DONE]: (state, action) => {
      const { address } = action.payload;
      return state.deleteIn([address, 'refillStory']).delete('refillProgress');
    },

    [REFILL_UPR]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn([address, 'refillStory', 'refill'], fromJS(tx));
      }
    },
    [REFILL_UPR_INIT]: (state, action) => {
      const { address } = action.payload;
      return state
        .setIn([address, 'refillStory'], fromJS({}))
        .set('refillProgress', true);
    },

    [REFILL_UPR_DONE]: (state, action) => {
      const { address } = action.payload;
      return state.deleteIn([address, 'refillStory']).delete('refillProgress');
    },

    [TOTAL_RECEIVING_OF]: {
      SUCCESS: (state, action) => {
        const { address, total } = action.payload;
        return state.setIn([address, 'totalReceiving'], fromJS(total));
      }
    },

    [TOTAL_SPENDING_OF]: {
      SUCCESS: (state, action) => {
        const { address, total } = action.payload;
        return state.setIn([address, 'totalSpending'], fromJS(total));
      }
    },

    [WITHDRAW_ETH]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn([address, 'withdrawStory', 'withdraw'], fromJS(tx));
      }
    },

    [WITHDRAW_ETH_INIT]: (state, action) => {
      const { address } = action.payload;
      return state
        .setIn([address, 'withdrawStory'], fromJS({}))
        .set('withdrawProgress', true);
    },

    [WITHDRAW_ETH_DONE]: (state, action) => {
      const { address } = action.payload;
      return state
        .deleteIn([address, 'withdrawStory'])
        .delete('withdrawProgress');
    },

    [WITHDRAW_UPR]: {
      SUCCESS: (state, action) => {
        const { address, tx } = action.payload;
        return state.setIn([address, 'withdrawStory', 'withdraw'], fromJS(tx));
      }
    },

    [WITHDRAW_UPR_INIT]: (state, action) => {
      const { address } = action.payload;
      return state
        .setIn([address, 'withdrawStory'], fromJS({}))
        .set('withdrawProgress', true);
    },

    [WITHDRAW_UPR_DONE]: (state, action) => {
      const { address } = action.payload;
      return state
        .deleteIn([address, 'withdrawStory'])
        .delete('withdrawProgress');
    },

    [CHANGE_BALANCE]: {
      SUCCESS: (state, action) => {
        const { address, changeBalance } = action.payload;
        return state.setIn([address, 'changeBalance'], fromJS(changeBalance));
      },
      FAIL: state => state.set('disableChangeBalanceLoading', true)
    },

    [HISTORY]: {
      SUCCESS: (state, action) => {
        const { address, history } = action.payload;
        return state
          .setIn([address, 'history'], fromJS(history))
          .set('disableHistoryLoading');
      },
      FAIL: state => state.set('disableHistoryLoading', true)
    },

    [REDIRECT_AFTER_SET_WALLET]: (state, action) => {
      return action.payload
        ? state.set('redirectAfterSetWallet', action.payload)
        : state.delete('redirectAfterSetWallet');
    },

    [GAS_PRICE]: {
      SUCCESS: (state, { payload }) => state.set('gasPrice', payload),
      FAIL: state =>
        state.update('oranges', (value = GAS_PRICE_DEFAULT) => value)
    },
    [BURN]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['burnStory', 'burn'], fromJS(tx));
      }
    },
    [BURN_INIT]: state => {
      return state.setIn(['burnStory'], fromJS({})).set('burnProgress', true);
    },
    [BURN_DONE]: state => {
      return state.deleteIn(['burnStory']).delete('burnProgress');
    },
    [MINT]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['mintStory', 'mint'], fromJS(tx));
      }
    },
    [MINT_INIT]: state => {
      return state.setIn(['mintStory'], fromJS({})).set('mintProgress', true);
    },
    [MINT_DONE]: state => {
      return state.deleteIn(['mintStory']).delete('mintProgress');
    },
    [UFR_SWAP_TO_UPR]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['ufrSwapToUPRStory', 'ufrSwapToUPR'], fromJS(tx));
      }
    },
    [UFR_SWAP_TO_UPR_INIT]: state => {
      return state
        .setIn(['ufrSwapToUPRStory'], fromJS({}))
        .set('ufrSwapToUPRProgress', true);
    },
    [UFR_SWAP_TO_UPR_DONE]: state => {
      return state
        .deleteIn(['ufrSwapToUPRStory'])
        .delete('ufrSwapToUPRProgress');
    },
    [STAKE]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['stakeStory', 'stake'], fromJS(tx));
      }
    },
    [STAKE_INIT]: state => {
      return state.setIn(['stakeStory'], fromJS({})).set('stakeProgress', true);
    },
    [STAKE_DONE]: state => {
      return state.deleteIn(['stakeStory']).delete('stakeProgress');
    },
    [WITHDRAW_STAKE_UPR]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['withdrawStakeStory', 'withdrawStake'], fromJS(tx));
      }
    },
    [WITHDRAW_STAKE_UPR_INIT]: state => {
      return state
        .setIn(['withdrawStakeStory'], fromJS({}))
        .set('withdrawStakeProgress', true);
    },
    [WITHDRAW_STAKE_UPR_DONE]: state => {
      return state
        .deleteIn(['withdrawStakeStory'])
        .delete('withdrawStakeProgress');
    },
    [PERCENTAGE_OF_FEE]: {
      SUCCESS: (state, action) => {
        const { percentageFee } = action.payload;
        return state.set('percentageFee', fromJS(percentageFee));
      }
    },
    [CONFIGURE_FEE]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['configureFeeStory', 'configureFee'], fromJS(tx));
      }
    },
    [CONFIGURE_FEE_INIT]: state => {
      return state
        .setIn(['configureFeeStory'], fromJS({}))
        .set('configureFeeProgress', true);
    },
    [CONFIGURE_FEE_DONE]: state => {
      return state
        .deleteIn(['configureFeeStory'])
        .delete('configureFeeProgress');
    },
    [CONFIGURE_RATIO_SWAPPING]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(
          ['configureRatioSwapStory', 'configureRatioSwap'],
          fromJS(tx)
        );
      }
    },
    [CONFIGURE_RATIO_SWAPPING_INIT]: state => {
      return state
        .setIn(['configureRatioSwapStory'], fromJS({}))
        .set('configureRatioSwapProgress', true);
    },
    [CONFIGURE_RATIO_SWAPPING_DONE]: state => {
      return state
        .deleteIn(['configureRatioSwapStory'])
        .delete('configureRatioSwapProgress');
    }
  },
  initialState
);
