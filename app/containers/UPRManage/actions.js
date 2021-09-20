import { createAction } from 'redux-actions';
import Erc20 from '../../blockchain/erc20';
import { EthClient } from '../../blockchain';
import {
  ADD_MINTER,
  ADD_MINTER_INIT,
  ADD_MINTER_DONE,
  GET_MINTER_LIST,
  DELETE_MINTER,
  DELETE_MINTER_INIT,
  DELETE_MINTER_DONE,
  GET_IS_ADMIN
} from './constants';

export const addMinterAction = createAction(
  ADD_MINTER,
  async (wallet, address, gas = null) => ({
    tx: await Erc20.instance.addAdmin(wallet, address, gas)
  })
);

export const addMinterInitAction = createAction(ADD_MINTER_INIT);

export const addMinterDoneAction = createAction(ADD_MINTER_DONE);

export const getMintersAction = createAction(GET_MINTER_LIST, async () => ({
  minters: await Erc20.instance.getAdmins()
}));

export const deleteMinterAction = createAction(
  DELETE_MINTER,
  async (wallet, address, gas = null) => ({
    tx: await Erc20.instance.renounceAdmin(wallet, address, gas)
  })
);

export const deleteMinterInitAction = createAction(DELETE_MINTER_INIT);

export const deleteMinterDoneAction = createAction(DELETE_MINTER_DONE);

export const getIsAdminAction = createAction(GET_IS_ADMIN, async address => ({
  address,
  isAdmin: await Erc20.instance.isAdmin(address)
}));
