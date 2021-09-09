import { createAction } from 'redux-actions';
import {
  ALLOWANCE,
  APPROVE,
  BALANCE_OF_CONTRACT_TOKEN_ETH,
  BALANCE_OF_CONTRACT_TOKEN_UPR,
  BALANCE_OF_ETH,
  BALANCE_OF_TOKEN,
  TOTAL_SUPPLY_OF_TOKEN,
  CHANGE_BALANCE,
  GAS_PRICE,
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
  WITHDRAW_UPR,
  WITHDRAW_UPR_INIT,
  WITHDRAW_UPR_DONE,
  BURN,
  BURN_INIT,
  BURN_DONE,
  MINT,
  MINT_DONE,
  MINT_INIT,
  STAKE,
  STAKE_INIT,
  STAKE_DONE,
  BALANCE_OF_UPR_STAKING,
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
  ALLOWANCE_UFR,
  APPROVE_UFR,
  CONFIGURE_RATIO_SWAPPING,
  CONFIGURE_RATIO_SWAPPING_DONE,
  CONFIGURE_RATIO_SWAPPING_INIT
} from './constants';
import { EthClient, UPRStakingContract, UPRSwap } from '../../blockchain';
import UpfiringContract from '../../blockchain/upfiring';
import Erc20 from '../../blockchain/erc20';
import UFRErc20 from '../../blockchain/ufrErc20';

export const setWalletAction = createAction(SET_WALLET);

export const removeWalletAction = createAction(REMOVE_WALLET);

export const balanceOfEthAction = createAction(
  BALANCE_OF_ETH,
  async address => ({
    address,
    balance: await EthClient.instance.getBalance(address)
  })
);

export const balanceOfTokenAction = createAction(
  BALANCE_OF_TOKEN,
  async address => ({
    address,
    balance: await Erc20.instance.balanceOf(address)
  })
);

export const balanceOfUFRTokenAction = createAction(
  BALANCE_OF_UFR_TOKEN,
  async address => ({
    address,
    balance: await UFRErc20.instance.balanceOf(address)
  })
);

export const totalSupplyOfTokenAction = createAction(
  TOTAL_SUPPLY_OF_TOKEN,
  async () => ({
    totalSupply: await Erc20.instance.totalSupply()
  })
);

export const getUFRSwapToUPRRateAction = createAction(
  UFR_SWAP_TO_UPR_RATE,
  async () => ({
    rate: await UPRSwap.instance.getSwapRate()
  })
);

export const setUFRSwapToUPRRateAction = createAction(
  CONFIGURE_RATIO_SWAPPING,
  async (wallet, value, gas = null) => ({
    tx: await UPRSwap.instance.setSwapRate(wallet, value, gas)
  })
);

export const balanceOfETHContractTokenAction = createAction(
  BALANCE_OF_CONTRACT_TOKEN_ETH,
  async address => ({
    address,
    balance: await UpfiringContract.instance.balanceOf(address)
  })
);

export const balanceOfUPRContractTokenAction = createAction(
  BALANCE_OF_CONTRACT_TOKEN_UPR,
  async address => ({
    address,
    balance: await UpfiringContract.instance.balanceOfUPR(address)
  })
);

export const balanceOfUPRStaking = createAction(
  BALANCE_OF_UPR_STAKING,
  async address => ({
    address,
    balance: await UPRStakingContract.instance.balanceOf(address)
  })
);

export const percentageOfFee = createAction(PERCENTAGE_OF_FEE, async () => ({
  percentageFee: await UPRStakingContract.instance.getPercentage()
}));

export const approveAction = createAction(
  APPROVE,
  async (wallet, spender, amount, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await Erc20.instance.approve(wallet, spender, amount, gas)
  })
);

export const approveUFRAction = createAction(
  APPROVE_UFR,
  async (wallet, spender, amount, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UFRErc20.instance.approve(wallet, spender, amount, gas)
  })
);

export const allowanceAction = createAction(
  ALLOWANCE,
  async (address, spender) => ({
    address,
    allowance: await Erc20.instance.allowance(address, spender)
  })
);

export const allowanceUFRAction = createAction(
  ALLOWANCE_UFR,
  async (address, spender) => ({
    address,
    allowance: await UFRErc20.instance.allowance(address, spender)
  })
);

export const refillETHAction = createAction(
  REFILL_ETH,
  async (wallet, value, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UpfiringContract.instance.refill(wallet, value, gas)
  })
);

export const refillETHInitAction = createAction(REFILL_ETH_INIT);

export const refillETHDoneAction = createAction(REFILL_ETH_DONE);

export const refillUPRAction = createAction(
  REFILL_UPR,
  async (wallet, value, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UpfiringContract.instance.refillUPR(wallet, value, gas)
  })
);

export const refillUPRInitAction = createAction(REFILL_UPR_INIT);

export const refillUPRDoneAction = createAction(REFILL_UPR_DONE);

export const withdrawETHAction = createAction(
  WITHDRAW_ETH,
  async (wallet, value, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UpfiringContract.instance.withdraw(wallet, value, gas)
  })
);

export const withdrawETHInitAction = createAction(WITHDRAW_ETH_INIT);

export const withdrawETHDoneAction = createAction(WITHDRAW_ETH_DONE);

export const withdrawUPRAction = createAction(
  WITHDRAW_UPR,
  async (wallet, value, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UpfiringContract.instance.withdrawUPR(wallet, value, gas)
  })
);

export const withdrawUPRInitAction = createAction(WITHDRAW_UPR_INIT);

export const withdrawUPRDoneAction = createAction(WITHDRAW_UPR_DONE);

export const totalReceivingOfAction = createAction(
  TOTAL_RECEIVING_OF,
  async address => ({
    address,
    total: await UpfiringContract.instance.totalReceivingOf(address)
  })
);

export const totalSpendingOfAction = createAction(
  TOTAL_SPENDING_OF,
  async address => ({
    address,
    total: await UpfiringContract.instance.totalSpendingOf(address)
  })
);

export const getChangeBalanceAction = createAction(
  CHANGE_BALANCE,
  async address => ({
    address,
    changeBalance: await UpfiringContract.instance.getChangeBalance(address)
  })
);

export const getHistoryAction = createAction(HISTORY, async address => ({
  address,
  history: await UpfiringContract.instance.getHistory(address)
}));

export const redirectAfterSetWalletAction = createAction(
  REDIRECT_AFTER_SET_WALLET
);

export const getGasPriceAction = createAction(GAS_PRICE, async () =>
  EthClient.instance.gasPrice()
);

export const burnAction = createAction(
  BURN,
  async (wallet, value, burnAddress, gas = null) => ({
    tx: await Erc20.instance.burn(wallet, value, burnAddress, gas)
  })
);

export const burnInitAction = createAction(BURN_INIT);

export const burnDoneAction = createAction(BURN_DONE);

export const mintAction = createAction(
  MINT,
  async (wallet, value, mintAddress, gas = null) => ({
    tx: await Erc20.instance.mint(wallet, value, mintAddress, gas)
  })
);

export const mintInitAction = createAction(MINT_INIT);

export const mintDoneAction = createAction(MINT_DONE);

export const ufrSwapToUPRAction = createAction(
  UFR_SWAP_TO_UPR,
  async (wallet, value, gas = null) => ({
    tx: await UPRSwap.instance.swap(wallet, value, gas)
  })
);

export const ufrSwapToUPRInitAction = createAction(UFR_SWAP_TO_UPR_INIT);

export const ufrSwapToUPRDoneAction = createAction(UFR_SWAP_TO_UPR_DONE);

export const stakeAction = createAction(
  STAKE,
  async (wallet, value, gas = null) => ({
    tx: await UPRStakingContract.instance.stake(wallet, value, gas)
  })
);

export const stakeInitAction = createAction(STAKE_INIT);

export const stakeDoneAction = createAction(STAKE_DONE);

export const withdrawStakeUPRAction = createAction(
  WITHDRAW_STAKE_UPR,
  async (wallet, value, gas = null) => ({
    address: wallet && wallet.getAddressString(),
    tx: await UPRStakingContract.instance.withdraw(wallet, value, gas)
  })
);

export const withdrawStakeUPRInitAction = createAction(WITHDRAW_STAKE_UPR_INIT);

export const withdrawStakeUPRDoneAction = createAction(WITHDRAW_STAKE_UPR_DONE);

export const configureFeeAction = createAction(
  CONFIGURE_FEE,
  async (wallet, value, gas = null) => ({
    tx: await UPRStakingContract.instance.setPercentage(wallet, value, gas)
  })
);

export const configureFeeInitAction = createAction(CONFIGURE_FEE_INIT);

export const configureFeeDoneAction = createAction(CONFIGURE_FEE_DONE);

export const configureRatioSwappingInitAction = createAction(
  CONFIGURE_RATIO_SWAPPING_INIT
);

export const configureRatioSwappingDoneAction = createAction(
  CONFIGURE_RATIO_SWAPPING_DONE
);
