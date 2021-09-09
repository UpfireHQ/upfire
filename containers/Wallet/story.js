import {
  allowanceAction,
  approveAction,
  balanceOfETHContractTokenAction,
  balanceOfUPRContractTokenAction,
  balanceOfUFRTokenAction,
  balanceOfEthAction,
  balanceOfTokenAction,
  totalSupplyOfTokenAction,
  getChangeBalanceAction,
  getHistoryAction,
  refillETHAction,
  refillETHDoneAction,
  refillETHInitAction,
  refillUPRAction,
  refillUPRInitAction,
  refillUPRDoneAction,
  totalReceivingOfAction,
  totalSpendingOfAction,
  withdrawETHAction,
  withdrawETHDoneAction,
  withdrawETHInitAction,
  withdrawUPRAction,
  withdrawUPRDoneAction,
  withdrawUPRInitAction,
  burnInitAction,
  burnAction,
  burnDoneAction,
  mintAction,
  mintInitAction,
  mintDoneAction,
  stakeAction,
  stakeInitAction,
  stakeDoneAction,
  balanceOfUPRStaking,
  withdrawStakeUPRAction,
  withdrawStakeUPRInitAction,
  withdrawStakeUPRDoneAction,
  percentageOfFee,
  configureFeeAction,
  configureFeeInitAction,
  configureFeeDoneAction,
  getUFRSwapToUPRRateAction,
  ufrSwapToUPRInitAction,
  ufrSwapToUPRDoneAction,
  ufrSwapToUPRAction,
  allowanceUFRAction,
  approveUFRAction,
  setUFRSwapToUPRRateAction,
  configureRatioSwappingDoneAction,
  configureRatioSwappingInitAction
} from './actions';
import EthClient from '../../blockchain/client';
import trans from '../../translations';
import { GAS_LIMIT } from '../../constants';
import UpfiringContract from '../../blockchain/upfiring';
import UPRStakingContract from '../../blockchain/uprStaking';
import { alertConfirmationStory } from '../Alerts/story';
import downloadBlobFile from '../../utils/downloadBlobFile';
import logger from '../../utils/logger';
import { UPRSwap } from '../../blockchain';

/**
 * refill
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */

export const refillETHStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [, ethBalance] = await Promise.all([
    dispatch(balanceOfTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(ethBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(refillETHInitAction({ address }));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(refillETHAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillETHDoneAction({ address }));
    return logger.error('refillETHAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('refill.success'));
  await dispatch(refillETHDoneAction({ address }));
};

export const refillUPRStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [uprBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(uprBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUPR'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(refillUPRInitAction({ address }));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  let allowed = false;
  const spender = UpfiringContract.instance.address;

  try {
    const { value } = await dispatch(allowanceAction(address, spender));
    allowed = Number(value.allowance);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillUPRDoneAction({ address }));
    return logger.error('allowanceAction.catch', e);
  }

  if (!allowed < Number(amount)) {
    try {
      if (allowed > 0) {
        const { value: valueZero } = await dispatch(
          approveAction(wallet, spender, 0, gas)
        );
        await EthClient.instance.waitTransaction(valueZero.tx);
      }

      const { value } = await dispatch(
        approveAction(wallet, spender, amount, gas)
      );
      await EthClient.instance.waitTransaction(value.tx);
    } catch (e) {
      await alertConfirmationStory(dispatch, trans('refill.failed'));
      await dispatch(refillUPRDoneAction({ address }));
      return logger.error('approveAction.catch', e);
    }
  }

  try {
    const { value } = await dispatch(allowanceAction(address, spender));
    if (Number(value.allowance) < Number(amount)) {
      await alertConfirmationStory(dispatch, trans('refill.failed'));
      await dispatch(refillUPRDoneAction({ address }));
      return;
    }
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillUPRDoneAction({ address }));
    return logger.error('allowanceAction.catch', e);
  }

  try {
    const { value } = await dispatch(refillUPRAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(refillUPRDoneAction({ address }));
    return logger.error('refillUPRAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('refill.success'));
  await dispatch(refillUPRDoneAction({ address }));
};

/**
 * withdraw
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const withdrawETHStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;
  const address = wallet.getAddressString();

  const [availableBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfETHContractTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([available, eth]) => [
    (available.value && available.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(availableBalance) < Number(amount)) {
    await alertConfirmationStory(
      dispatch,
      trans('walletOperations.WithdrawETH')
    );
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(withdrawETHInitAction({ address }));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(withdrawETHAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('withdraw.failed'));
    await dispatch(withdrawETHDoneAction({ address }));
    return logger.error('withdrawETHAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('withdraw.success'));
  await dispatch(withdrawETHDoneAction({ address }));
};

export const withdrawUPRStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;
  const address = wallet.getAddressString();

  const [availableBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfUPRContractTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([available, eth]) => [
    (available.value && available.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(availableBalance) < Number(amount)) {
    await alertConfirmationStory(
      dispatch,
      trans('walletOperations.WithdrawUPR')
    );
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUPR'));
    return;
  }

  await dispatch(withdrawUPRInitAction({ address }));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(withdrawUPRAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('withdraw.failed'));
    await dispatch(withdrawUPRDoneAction({ address }));
    return logger.error('withdrawUPRAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('withdraw.success'));
  await dispatch(withdrawUPRDoneAction({ address }));
};

/**
 * balances
 * @param dispatch
 * @param address
 * @return {Promise<void>}
 */
export const checkBalancesStory = async (dispatch, address) => {
  if (!address) {
    return;
  }
  dispatch(balanceOfTokenAction(address)).catch(logger.warn);
  dispatch(balanceOfUFRTokenAction(address)).catch(logger.warn);
  dispatch(balanceOfEthAction(address)).catch(logger.warn);
  dispatch(balanceOfETHContractTokenAction(address)).catch(logger.warn);
  dispatch(balanceOfUPRStaking(address)).catch(logger.warn);
  dispatch(percentageOfFee()).catch(logger.warn);
};

export const getUFRSwapToUPRRate = async dispatch => {
  return dispatch(getUFRSwapToUPRRateAction());
};

export const configureRatioSwapStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [ethBalance] = await Promise.all([
    dispatch(balanceOfEthAction(address))
  ]).then(([eth]) => [(eth.value && eth.value.balance) || 0]);

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(configureRatioSwappingInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      setUFRSwapToUPRRateAction(wallet, amount, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Configure ratio swapping failed');
    await dispatch(configureRatioSwappingDoneAction());
    return logger.error('mintAction', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Configure ratio swapping success');
  await dispatch(configureRatioSwappingDoneAction());
  await dispatch(getUFRSwapToUPRRateAction());
};

export const getPercentageOfFee = async dispatch => {
  dispatch(percentageOfFee()).catch(logger.warn);
};

/**
 * totals
 * @param dispatch
 * @param address
 * @return {Promise<void>}
 */
export const checkTotalsStory = async (dispatch, address) => {
  if (!address) {
    return;
  }
  dispatch(totalReceivingOfAction(address)).catch(logger.warn);
  dispatch(totalSpendingOfAction(address)).catch(logger.warn);
};

/**
 * transactions history
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const checkHistoryStory = async (dispatch, payload) => {
  const { address, loadingChangeBalance, loadingHistory } = payload;

  if (!loadingChangeBalance) {
    dispatch(getChangeBalanceAction(address)).catch(logger.warn);
  }

  if (!loadingHistory) {
    dispatch(getHistoryAction(address)).catch(logger.warn);
  }
};

/**
 *
 * @param wallet
 * @return {Promise<void>}
 */
export const downloadWalletStory = async wallet => {
  const data =
    wallet && wallet.address ? JSON.stringify(wallet) : String(wallet);

  downloadBlobFile(new Blob([data], { type: 'text/plain' }), 'wallet.json');
};

export const checkTotalSupplyStory = async dispatch => {
  await dispatch(totalSupplyOfTokenAction());
};

export const burnTokenStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice, address: burnAddress } = payload;

  const address = wallet.getAddressString();

  const [totalSupply, ethBalance] = await Promise.all([
    dispatch(totalSupplyOfTokenAction()),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.totalSupply) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(totalSupply) < Number(amount)) {
    await alertConfirmationStory(
      dispatch,
      'Burn amount is exceed total supply'
    );
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(burnInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      burnAction(wallet, amount, burnAddress, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Burn failed');
    await dispatch(burnDoneAction());
    return logger.error('burnAction', e);
  }

  await checkTotalSupplyStory(dispatch);
  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Burn success');
  await dispatch(burnDoneAction());
};

export const mintTokenStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice, address: mintAddress } = payload;

  const address = wallet.getAddressString();

  const [, ethBalance] = await Promise.all([
    dispatch(totalSupplyOfTokenAction()),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.totalSupply) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(mintInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      mintAction(wallet, amount, mintAddress, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Mint failed');
    await dispatch(mintDoneAction());
    return logger.error('mintAction', e);
  }

  await checkTotalSupplyStory(dispatch);
  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Mint success');
  await dispatch(mintDoneAction());
};

export const ufrSwapToUPRStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [ufrBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfUFRTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(ufrBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUFR'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(ufrSwapToUPRInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  let allowed = false;
  const spender = UPRSwap.instance.address;

  try {
    const { value } = await dispatch(allowanceUFRAction(address, spender));
    allowed = Number(value.allowance);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('refill.failed'));
    await dispatch(ufrSwapToUPRDoneAction({ address }));
    return logger.error('allowanceUFRAction.catch', e);
  }

  if (!allowed < Number(amount)) {
    try {
      if (allowed > 0) {
        const { value: valueZero } = await dispatch(
          approveUFRAction(wallet, spender, 0, gas)
        );
        await EthClient.instance.waitTransaction(valueZero.tx);
      }

      const { value } = await dispatch(
        approveUFRAction(wallet, spender, amount, gas)
      );
      await EthClient.instance.waitTransaction(value.tx);
    } catch (e) {
      await alertConfirmationStory(dispatch, 'Swap failed');
      await dispatch(ufrSwapToUPRDoneAction({ address }));
      return logger.error('approveURFAction.catch', e);
    }
  }

  try {
    const { value } = await dispatch(allowanceUFRAction(address, spender));
    if (Number(value.allowance) < Number(amount)) {
      await alertConfirmationStory(dispatch, 'Swap failed');
      await dispatch(ufrSwapToUPRDoneAction({ address }));
      return;
    }
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Swap failed');
    await dispatch(ufrSwapToUPRDoneAction({ address }));
    return logger.error('allowanceUFRAction.catch', e);
  }

  try {
    const { value } = await dispatch(ufrSwapToUPRAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Swap failed');
    await dispatch(ufrSwapToUPRDoneAction());
    return logger.error('ufrSwapToUPRAction', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Swap success');
  await dispatch(ufrSwapToUPRDoneAction());
};

export const stakeStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [uprBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfTokenAction(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([token, eth]) => [
    (token.value && token.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(uprBalance) < Number(amount)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUPR'));
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(stakeInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  let allowed = false;
  const spender = UPRStakingContract.instance.address;

  try {
    const { value } = await dispatch(allowanceAction(address, spender));
    allowed = Number(value.allowance);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Stake failed');
    await dispatch(refillUPRDoneAction({ address }));
    return logger.error('allowanceAction.catch', e);
  }

  if (!allowed < Number(amount)) {
    try {
      if (allowed > 0) {
        const { value: valueZero } = await dispatch(
          approveAction(wallet, spender, 0, gas)
        );
        await EthClient.instance.waitTransaction(valueZero.tx);
      }

      const { value } = await dispatch(
        approveAction(wallet, spender, amount, gas)
      );
      await EthClient.instance.waitTransaction(value.tx);
    } catch (e) {
      await alertConfirmationStory(dispatch, 'Stake failed');
      await dispatch(refillUPRDoneAction({ address }));
      return logger.error('approveAction.catch', e);
    }
  }

  try {
    const { value } = await dispatch(allowanceAction(address, spender));
    if (Number(value.allowance) < Number(amount)) {
      await alertConfirmationStory(dispatch, 'Stake failed');
      await dispatch(refillUPRDoneAction({ address }));
      return;
    }
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Stake failed');
    await dispatch(refillUPRDoneAction({ address }));
    return logger.error('allowanceAction.catch', e);
  }

  try {
    const { value } = await dispatch(stakeAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Stake failed');
    await dispatch(stakeDoneAction());
    return logger.error('stakeAction', e);
  }

  await checkTotalSupplyStory(dispatch);
  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Stake success');
  await dispatch(stakeDoneAction());
};

export const withdrawStakeUPRStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;
  const address = wallet.getAddressString();

  const [availableBalance, ethBalance] = await Promise.all([
    dispatch(balanceOfUPRStaking(address)),
    dispatch(balanceOfEthAction(address))
  ]).then(([available, eth]) => [
    (available.value && available.value.balance) || 0,
    (eth.value && eth.value.balance) || 0
  ]);

  if (Number(availableBalance) < Number(amount)) {
    await alertConfirmationStory(
      dispatch,
      trans('walletOperations.WithdrawUPR')
    );
    return;
  }

  const ethNeed = await EthClient.instance.ethNeed(GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillUPR'));
    return;
  }

  await dispatch(withdrawStakeUPRInitAction({ address }));

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      withdrawStakeUPRAction(wallet, amount, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, trans('withdraw.failed'));
    await dispatch(withdrawStakeUPRDoneAction({ address }));
    return logger.error('withdrawUPRAction.catch', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, trans('withdraw.success'));
  await dispatch(withdrawStakeUPRDoneAction({ address }));
};

export const configureFeeStory = async (dispatch, payload) => {
  const { wallet, amount, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [ethBalance] = await Promise.all([
    dispatch(balanceOfEthAction(address))
  ]).then(([eth]) => [(eth.value && eth.value.balance) || 0]);

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(configureFeeInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(configureFeeAction(wallet, amount, gas));
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Configure fee failed');
    await dispatch(configureFeeDoneAction());
    return logger.error('mintAction', e);
  }

  await checkBalancesStory(dispatch, address);
  await alertConfirmationStory(dispatch, 'Configure fee success');
  await dispatch(configureFeeDoneAction());
};
