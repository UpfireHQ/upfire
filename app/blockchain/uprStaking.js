import EthClient from './client';
import { UPRSTAKING } from '../constants/blockchain';
import contractSettings from './contracts/UPRStake.json';
import { method } from 'lodash';

let _instance;

export default class UPRStakingContract {
  static create() {
    return new UPRStakingContract(UPRSTAKING);
  }

  /**
   * @return {UPRStakingContract}
   */
  static get instance() {
    if (!_instance) {
      _instance = UPRStakingContract.create();
    }

    return _instance;
  }

  constructor(address) {
    this._contract = EthClient.instance.getContract(
      contractSettings.abi,
      address
    );
  }

  get address() {
    return this._contract.options.address;
  }

  /**
   * @return {{
   *   balanceOf: function(*)
   *   check: function(*)
   *   refill: function(*)
   *   withdraw: function(*)
   *   pay: function(*)
   *   totalReceivingOf: function(*)
   *   totalSpendingOf: function(*)
   * }}
   */
  get methods() {
    return this._contract.methods;
  }

  async getEventInfo(event, address) {
    const events = [];
    if (address) {
      try {
        const result = await this._contract.getPastEvents(event, {
          filter: { _to: address },
          fromBlock: 0,
          toBlock: 'latest'
        });
        for (let e of result) {
          events.push({
            e,
            block: await EthClient.instance.eth.getBlock(e.blockNumber)
          });
        }
        return events;
      } catch (e) {}
    }
  }

  getEvents() {
    return this._contract.events;
  }

  async balanceOf(address) {
    return EthClient.instance
      .call(this.methods.balanceOf(address))
      .catch(() => 0);
  }

  async totalStaking() {
    return EthClient.instance.call(this.methods.totalStaking()).catch(() => 0);
  }

  async stake(wallet, value, gas = null) {
    const method = this.methods.stake(String(value));
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas,
      undefined
    );
  }

  async withdraw(wallet, value, gas = null) {
    const method = this.methods.withdraw(String(value));
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas,
      undefined
    );
  }

  async getPercentage() {
    return EthClient.instance
      .call(this.methods.getPercentage())
      .then(percentage => {
        return percentage;
      })
      .catch(() => 0);
  }

  async setPercentage(wallet, value, gas = null) {
    const method = this.methods.setPercentage(String(value));
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas,
      undefined
    );
  }
}
