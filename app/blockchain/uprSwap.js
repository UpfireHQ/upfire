import EthClient from './client';
import { UPRSWAP } from '../constants/blockchain';
import contractSettings from './contracts/UPRSwap.json';

let _instance;

export default class UPRSwapContract {
  static create() {
    return new UPRSwapContract(UPRSWAP);
  }

  /**
   * @return {UPRSwapContract}
   */
  static get instance() {
    if (!_instance) {
      _instance = UPRSwapContract.create();
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

  async getSwapRate() {
    return EthClient.instance.call(this.methods.getSwapRate()).catch(() => 0);
  }

  async setSwapRate(wallet, value, gas = null) {
    const method = this.methods.setSwapRate(String(value));
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas,
      undefined
    );
  }

  async swap(wallet, value, gas = null) {
    console.log('value---->', value);
    const method = this.methods.swap(String(value));
    return EthClient.instance.sendSignedTransaction(
      wallet,
      method,
      this.address,
      gas,
      undefined
    );
  }
}
