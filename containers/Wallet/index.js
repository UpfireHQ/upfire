import { connect } from 'react-redux';
import WalletPage from './components/WalletPage';
import {
  checkBalancesStory,
  checkHistoryStory,
  checkTotalsStory,
  downloadWalletStory,
  refillETHStory,
  refillUPRStory,
  withdrawETHStory,
  checkTotalSupplyStory,
  burnTokenStory,
  mintTokenStory,
  stakeStory,
  withdrawUPRStory,
  withdrawStakeUPRStory,
  configureFeeStory,
  getUFRSwapToUPRRate,
  ufrSwapToUPRStory,
  configureRatioSwapStory
} from './story';
import { getIsAdminActionStory } from '../UPRManage/story';
import {
  getGasPriceAction,
  removeWalletAction,
  setWalletAction
} from './actions';
import { push } from 'react-router-redux';

const mapDispatchToProps = dispatch => ({
  onCheckBalances: address => checkBalancesStory(dispatch, address),
  onCheckTotals: address => checkTotalsStory(dispatch, address),
  onCheckHistory: payload => checkHistoryStory(dispatch, payload),
  onRefillETH: payload => refillETHStory(dispatch, payload),
  onRefillUPR: payload => refillUPRStory(dispatch, payload),
  onWithdrawETH: payload => withdrawETHStory(dispatch, payload),
  onWithdrawUPR: payload => withdrawUPRStory(dispatch, payload),
  onSetWallet: payload => dispatch(setWalletAction(payload)),
  onRemoveWallet: payload => dispatch(removeWalletAction(payload)),
  routerTo: path => dispatch(push(path)),
  onDownloadWallet: payload => downloadWalletStory(payload),
  onGasPrice: () => dispatch(getGasPriceAction()),
  onCheckTotalSupplyStory: () => checkTotalSupplyStory(dispatch),
  onBurnStory: payload => burnTokenStory(dispatch, payload),
  onMintStory: payload => mintTokenStory(dispatch, payload),
  onGetIsAdmin: address => getIsAdminActionStory(dispatch, address),
  onStakeStory: payload => stakeStory(dispatch, payload),
  onWithdrawStakeStory: payload => withdrawStakeUPRStory(dispatch, payload),
  onConfigureFeeStory: payload => configureFeeStory(dispatch, payload),
  onGetUFRSwapToUPRRate: () => getUFRSwapToUPRRate(dispatch),
  onUFRSwapToUPR: payload => ufrSwapToUPRStory(dispatch, payload),
  onConfigureRatioSwapStory: payload =>
    configureRatioSwapStory(dispatch, payload)
});

const mapStateToProps = state => {
  const wallet = state.wallet.get(state.wallet.get('address'));

  const statistic = state.app.get('statistic');

  return {
    internetConnection: state.app.get('disableTransaction'),
    ...(wallet && wallet.toJS && wallet.toJS()),
    ...(statistic && statistic.toJS && statistic.toJS()),
    disableChangeBalanceLoading: state.wallet.get(
      'disableChangeBalanceLoading'
    ),
    disableHistoryLoading: state.wallet.get('disableHistoryLoading'),
    refillProgress: state.wallet.get('refillProgress'),
    withdrawProgress: state.wallet.get('withdrawProgress'),
    redirect: state.wallet.get('redirectAfterSetWallet'),
    gasPrice: state.wallet.get('gasPrice'),
    tokenTotalSupply: state.wallet.get('tokenTotalSupply'),
    burnProgress: state.wallet.get('burnProgress'),
    mintProgress: state.wallet.get('mintProgress'),
    stakeProgress: state.wallet.get('stakeProgress'),
    withdrawStakeProgress: state.wallet.get('withdrawStakeProgress'),
    configureFeeProgress: state.wallet.get('configureFeeProgress'),
    ufrSwapToUPRProgress: state.wallet.get('ufrSwapToUPRProgress'),
    stakeBalanceUPR: wallet && wallet.toJS && wallet.get('stakeBalanceUPR'),
    isAdmin: state.upr && state.upr.get('isAdmin'),
    percentageFee: state.wallet.get('percentageFee'),
    ufrRateToUPR: state.wallet.get('ufrRateToUPR'),
    configureRatioSwapProgress: state.wallet.get('configureRatioSwapProgress')
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletPage);
