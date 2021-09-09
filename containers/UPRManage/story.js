import { balanceOfEthAction } from '../Wallet/actions';
import EthClient from '../../blockchain/client';
import { alertConfirmationStory } from '../Alerts/story';
import trans from '../../translations';
import { GAS_LIMIT } from '../../constants';
import {
  addMinterInitAction,
  addMinterAction,
  addMinterDoneAction,
  getMintersAction,
  deleteMinterAction,
  deleteMinterInitAction,
  deleteMinterDoneAction,
  getIsAdminAction
} from './actions';
import logger from '../../utils/logger';

export const addMinterStory = async (dispatch, payload) => {
  const { wallet, address: minterAddress, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [ethBalance] = await Promise.all([
    dispatch(balanceOfEthAction(address))
  ]).then(([eth]) => [(eth.value && eth.value.balance) || 0]);

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(addMinterInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      addMinterAction(wallet, minterAddress, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Add minter failed');
    await dispatch(addMinterDoneAction());
    return logger.error('addMinterAction', e);
  }

  await dispatch(getMintersAction());
  await alertConfirmationStory(dispatch, 'Add minter success');
  await dispatch(addMinterDoneAction());
};

export const deleteMinterStory = async (dispatch, payload) => {
  const { wallet, address: minterAddress, gasPrice } = payload;

  const address = wallet.getAddressString();

  const [ethBalance] = await Promise.all([
    dispatch(balanceOfEthAction(address))
  ]).then(([eth]) => [(eth.value && eth.value.balance) || 0]);

  const ethNeed = await EthClient.instance.ethNeed(2 * GAS_LIMIT, gasPrice);

  if (Number(ethNeed) >= Number(ethBalance)) {
    await alertConfirmationStory(dispatch, trans('walletOperations.RefillETH'));
    return;
  }

  await dispatch(deleteMinterInitAction());

  const gas = {
    price: gasPrice,
    limit: GAS_LIMIT
  };

  try {
    const { value } = await dispatch(
      deleteMinterAction(wallet, minterAddress, gas)
    );
    await EthClient.instance.waitTransaction(value.tx);
  } catch (e) {
    await alertConfirmationStory(dispatch, 'Delete minter failed');
    await dispatch(deleteMinterDoneAction());
    return logger.error('deleteMinterAction', e);
  }

  await dispatch(getMintersAction());
  await alertConfirmationStory(dispatch, 'Delete minter success');
  await dispatch(deleteMinterDoneAction());
};

export const getIsAdminActionStory = async (dispatch, address) => {
  await dispatch(getIsAdminAction(address));
};

export const getMintersStory = async dispatch => {
  await dispatch(getMintersAction());
};
